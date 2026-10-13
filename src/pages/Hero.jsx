import React, { useEffect, useState } from 'react';
import Hero3D from '../components/Hero3d';
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from 'react-i18next';
import '../styles/Hero.css';
import { useSelector } from 'react-redux';

const Hero = () => {
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    let isCurrentLanguage = true;

    i18n.changeLanguage(lang).then(() => {
      if (!isCurrentLanguage) return;

      const translate = i18n.getFixedT(lang);
      setAnimation({
        lang,
        sequence: [
          translate('I build websites and mobile applications using React, React Native, and Django REST, creating seamless digital experiences.'),
          2000,
          translate('Welcome to my website.'),
          2000,
        ],
      });
    });

    return () => {
      isCurrentLanguage = false;
    };
  }, [lang, i18n]);
  return (
    <section id="home" className="hero">
      <div className="hero__background">
        <img src="/photo.PNG" alt="Background" className="hero__bg-img" />
        <div className="hero__overlay"></div>
      </div>

      <Hero3D />

      <div className="hero__content">
        <div className="hero__text-wrapper">

          <span className="hero__subtitle">{t('CRAFTING DIGITAL SOLUTIONS')}</span>

          <h1 className="hero__title">
            {t('I am')} <span className="text-gradient-gold">{t("Abdur Razzaq Nashed")}</span>
            <br />
            {t('Full Stack Developer')}
          </h1>

          <p className="hero__description">
            {animation?.lang === lang && (
              <TypeAnimation
                key={animation.lang}
                sequence={animation.sequence}
                repeat={Infinity}
              />
            )}
          </p>

          <div className="hero__actions">

            <a href="#projects" className="hero__btn hero__btn--primary">
              <span>{t('View My Work')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              href="https://github.com/abd-nashed"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn hero__btn--github"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="/cv.pdf"
              download="Abdur_Razzaq_Nashed_CV.pdf"
              className="hero__btn hero__btn--cv"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t('Download CV')}</span>
            </a>

          </div>

          <div className="hero__scroll-indicator">
            <span className="hero__scroll-text">{t('Scroll Down')}</span>
            <div className="hero__scroll-line"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;