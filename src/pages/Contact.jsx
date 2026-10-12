import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendContactMessage,
  resetContactState,
  selectContactStatus,
  selectContactError,
} from '../store/slices/contactSlice';
import Contact3D from '../components/Contact3D';
import '../styles/Contact.css';
import { useTranslation } from 'react-i18next';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

// RevealOnScroll
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal ${isVisible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// بيانات ثابتة
const CONTACT_INFO = [
  {
    icon: '📱',
    label: 'Phone',
    value: '+963 967 208 320',
    link: 'tel:+963967208320',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Syria, aleppo',
    link: 'https://maps.app.goo.gl/56WU5NhfGiuuAbSU8?g_st=aw',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: <FaGithub />,
    url: 'https://github.com/abd-nashed',
    color: '#333'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin />,
    url: '#',
    color: '#0A66C2'
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp />,
    url: 'https://wa.me/963967208320',
    color: '#25D366'
  },
  {
    name: 'Facebook',
    icon: <FaFacebook />,
    url: 'https://www.facebook.com/profile.php?id=61591512102895',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/abd_alrzak_nashed/',
    color: '#E4405F'
  },

];

// Component
const Contact = () => {
        const lang = useSelector((state) => state.lang.lang);
    const { t, i18n } = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(lang);
    }, [lang, i18n]);
  const dispatch = useDispatch();
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(sendContactMessage(formData));

    if (sendContactMessage.fulfilled.match(result)) {
      setFormData({ name: '', phone: '', subject: '', message: '' });
      setTimeout(() => dispatch(resetContactState()), 4000);
    }
  };

  const renderError = () => {
    if (!error) return 'Something went wrong. Please try again.';
    if (typeof error === 'string') return error;
    if (error.detail) return error.detail;

    return Object.entries(error)
      .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
      .join(' | ');
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__glow contact__glow--gold"></div>
      <div className="contact__glow contact__glow--blue"></div>

      <Contact3D />

      <div className="contact__container">
        {/* العنوان */}
        <div className="contact__header">
          <RevealOnScroll>
            <span className="contact__subtitle">{t('GET IN TOUCH')}</span>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="contact__title">
              {t("Let's")} <span className="text-gradient-gold">{t('Work')}</span> {t('Together')}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="contact__description">
             {t("Have a project in mind? Or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.")}
            </p>
          </RevealOnScroll>
        </div>

        <div className="contact__content">
          {/* النموذج */}
          <RevealOnScroll delay={300}>
            <div className="contact__form-wrapper glass-panel">
              <form className="contact__form" onSubmit={handleSubmit}>

                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="name" className="contact__label">{t('Name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact__input"
                      placeholder={t("Your name")}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="phone" className="contact__label">{t('Phone')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="contact__input"
                      placeholder="+963 9XX XXX XXX"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label htmlFor="subject" className="contact__label">{t('Subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="contact__input"
                    placeholder={t("What's this about?")}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__label">{t('Message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="contact__input contact__textarea"
                    placeholder={t("Tell me about your project...")}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact__spinner"></span>
                      <span>{t('Sending...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Send Message')}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="contact__status contact__status--success">
                    ✅ {t("Message sent successfully! I'll get back to you soon.")}
                  </div>
                )}
                {status === 'error' && (
                  <div className="contact__status contact__status--error">
                    ❌ {renderError()}
                  </div>
                )}

              </form>
            </div>
          </RevealOnScroll>

          {/* معلومات التواصل */}
          <RevealOnScroll delay={400}>
            <div className="contact__info">
              <div className="contact__info-cards">
                {CONTACT_INFO.map((info, index) => (
                  <div key={index} className="contact__info-card glass-panel">
                    <div className="contact__info-icon">{info.icon}</div>
                    <div className="contact__info-content">
                      <span className="contact__info-label">{info.label}</span>
                      {info.link ? (
                        <a href={info.link} className="contact__info-value">{info.value}</a>
                      ) : (
                        <span className="contact__info-value">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact__social glass-panel">
                <h3 className="contact__social-title">{t('Follow Me')}</h3>
                <div className="contact__social-links">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="contact__social-link"
                      aria-label={social.name}
                    >
                      <span className="contact__social-icon">{social.icon}</span>
                      <span className="contact__social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Contact;