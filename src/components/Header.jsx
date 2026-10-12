import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edit } from "../store/slices/langugeSlice";
import '../styles/Header.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  //  تطبيق الاتجاه على الصفحة حسب اللغة
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  //  تطبيق الوضع على <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  //  دالة تبديل اللغة
  const handleLang = () => {
    dispatch(edit());
    window.location.reload();
  };

  //  دالة تبديل الوضع
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // مراقبة التمرير لتحديد القسم النشط
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const updateHeader = () => {
      setIsScrolled(window.scrollY > 50);

      const marker = window.scrollY + window.innerHeight * 0.35;
      const activeItem = [...sections].reverse().find((id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= marker;
      });

      setActiveSection(activeItem ?? 'home');
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  //  دالة مساعدة لإغلاق القائمة عند الضغط على رابط
  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">

        {/* 1. Logo */}
        <div className="header__logo">
          <a href="#home" aria-label="Home">
            <img src="/logo.PNG" alt="Logo" className="header__logo-img" />
          </a>
        </div>

        {/* 2. Navigation Links */}
        <nav
          className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">

            <li className="header__nav-item">
              <a
                href="#home"
                className={`header__nav-link ${activeSection === 'home' ? 'header__nav-link--active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                {t('Home')}
              </a>
            </li>

            <li className="header__nav-item">
              <a
                href="#about"
                className={`header__nav-link ${activeSection === 'about' ? 'header__nav-link--active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                {t('About')}
              </a>
            </li>

            <li className="header__nav-item">
              <a
                href="#skills"
                className={`header__nav-link ${activeSection === 'skills' ? 'header__nav-link--active' : ''}`}
                onClick={() => handleNavClick('skills')}
              >
                {t('Skills')}
              </a>
            </li>

            <li className="header__nav-item">
              <a
                href="#projects"
                className={`header__nav-link ${activeSection === 'projects' ? 'header__nav-link--active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                {t('Projects')}
              </a>
            </li>

            <li className="header__nav-item">
              <a
                href="#contact"
                className={`header__nav-link ${activeSection === 'contact' ? 'header__nav-link--active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                {t('Contact')}
              </a>
            </li>

          </ul>
        </nav>

        {/* 3. Actions */}
        <div className="header__actions">

          <button
            className="header__icon-btn"
            onClick={handleLang}
            aria-label="Translate"
            title="Translate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8l6 6" />
              <path d="M4 14h6" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="M22 22l-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
          </button>

          <button
            className="header__icon-btn header__icon-btn--theme"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="#contact" className="header__cta">
            <span>{t("Let's Talk")}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <button
            className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;