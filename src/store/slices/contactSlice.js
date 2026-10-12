import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk: إرسال الرسالة إلى Django
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch('https://abdurrazzaq.pythonanywhere.com/api/contact_protofolio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Django غالبًا يرجع { field: ["error message"] }
        return rejectWithValue(data);
      }

      return data;

    } catch (err) {
      // خطأ شبكة (السيرفر مغلق، CORS، إلخ)
      return rejectWithValue({ detail: err.message || 'Network error' });
    }
  }
);

// Slice
const initialState = {
  status: 'idle',
  error: null,
  lastResponse: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.lastResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.status = 'sending';
        state.error = null;
      })

      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.lastResponse = action.payload;
      })

      .addCase(sendContactMessage.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload || { detail: 'Unknown error' };
      });
  },
});

export const { resetContactState } = contactSlice.actions;

export const selectContactStatus = (state) => state.contact.status;
export const selectContactError = (state) => state.contact.error;

export default contactSlice.reducer;