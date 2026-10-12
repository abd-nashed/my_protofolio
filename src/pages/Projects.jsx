import React, { useEffect, useRef, useState } from 'react';
import '../styles/Projects.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// مكون أنيميشن الظهور
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

const Projects = () => {
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <section id="projects" className="projects">
      {/* الخلفيات المتوهجة */}
      <div className="projects__glow projects__glow--gold"></div>
      <div className="projects__glow projects__glow--blue"></div>

      <div className="projects__container">

        {/* العنوان */}
        <div className="projects__header">
          <RevealOnScroll>
            <span className="projects__subtitle">{t('MY WORK')}</span>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="projects__title">
              {t('Featured')} <span className="text-gradient-gold">{t('Projects')}</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="projects__description">
              {t('A curated selection of projects that showcase my skills in web development, mobile apps, and immersive 3D experiences.')}
            </p>
          </RevealOnScroll>
        </div>

        {/* شبكة المشاريع */}
        <div className="projects__grid">

          <RevealOnScroll delay={0}>
            <article className="project-card glass-panel project-card--gold">
              <div className="project-card__header">
                <div className="project-card__icon">🛒</div>
                <span className="project-card__category project-card__category--gold">
                  {t('Web Application')}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t('Comprehensive Store')}</h3>
                <p className="project-card__description">
                  {t('A comprehensive e-commerce platform leveraging the power of Django REST Framework for the backend and React for the frontend. It supports product and store browsing and allows for guest checkout without registration, while featuring an advanced administrative dashboard (Superuser, Staff, Store, and Sales roles). The system utilizes JWT authentication with automatic token renewal, role-based permissions, and CORS domain protection.')}
                </p>

                <div className="project-card__tech">
                  <span className="project-card__tech-tag">React</span>
                  <span className="project-card__tech-tag">React Native</span>
                  <span className="project-card__tech-tag">Redux</span>
                  <span className="project-card__tech-tag">Django REST</span>
                  <span className="project-card__tech-tag">Axios</span>
                  <span className="project-card__tech-tag">Async</span>
                </div>
              </div>

              <div className="project-card__footer">
                <a href="https://solitary-salad-28cf.nashedabdalrzak.workers.dev/" className="project-card__btn project-card__btn--primary">
                  <span>{t('Live Demo')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a href="https://github.com/abd-nashed/my_store_apk/releases" className="project-card__btn project-card__btn--download">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{t('Download App')}</span>
                </a>
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <article className="project-card glass-panel project-card--blue">
              <div className="project-card__header">
                <div className="project-card__icon">🏨</div>
                <span className="project-card__category project-card__category--blue">
                  {t('Web Platform')}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t('Hotel Booking Platform')}</h3>
                <p className="project-card__description">
                  {t('A multi-vendor hotel booking platform featuring a React frontend and a Django REST backend. It enables customers to browse hotels and rooms, check availability, make direct bookings, and communicate with hotel owners. Users can register to add and manage their own hotels and rooms, while the administrator has a comprehensive dashboard to oversee all bookings and properties, supported by an automated commission system for every booking.')}
                </p>

                <div className="project-card__tech">
                  <span className="project-card__tech-tag">React</span>
                  <span className="project-card__tech-tag">React Native</span>
                  <span className="project-card__tech-tag">Redux</span>
                  <span className="project-card__tech-tag">Django REST</span>
                  <span className="project-card__tech-tag">Axios</span>
                  <span className="project-card__tech-tag">Async</span>
                </div>
              </div>

              <div className="project-card__footer">
                <a href="https://restless-cloud-56ec.nashedabdalrzak.workers.dev/" className="project-card__btn project-card__btn--primary">
                  <span>{t('Live Demo')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <article className="project-card glass-panel project-card--blue">
              <div className="project-card__header">
                <div className="project-card__icon">🏎️</div>
                <span className="project-card__category project-card__category--blue">
                  {t('3D Interactive Tool')}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t('A professional way to showcase and customize cars.')}</h3>
                <p className="project-card__description">
                  {t('Take a look at 3D cars and customize them.')}
                </p>

                <div className="project-card__tech">
                  <span className="project-card__tech-tag">React Three Fiber</span>
                  <span className="project-card__tech-tag">Three.js</span>
                  <span className="project-card__tech-tag">WebGL</span>
                </div>
              </div>

              <div className="project-card__footer">
                <a href="https://odd-meadow-393e.nashedabdalrzak.workers.dev/" className="project-card__btn project-card__btn--primary">
                  <span>{t('Live Demo')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <article className="project-card glass-panel project-card--blue">
              <div className="project-card__header">
                <div className="project-card__icon">🖼️</div>
                <span className="project-card__category project-card__category--blue">
                  {t('Web Application')}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t('Photo Editor')}</h3>
                <p className="project-card__description">
                  {t('You can upload your photo, edit it, add filters, and then download the edited version. Note: It does not work with iPhone photos.')}
                </p>

                <div className="project-card__tech">
                  <span className="project-card__tech-tag">React</span>
                </div>
              </div>

              <div className="project-card__footer">
                <a href="https://red-heart-a448.nashedabdalrzak.workers.dev/" className="project-card__btn project-card__btn--primary">
                  <span>{t('Live Demo')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <a href="https://github.com/abd-nashed/photo_editor_apk_download/releases" className="project-card__btn project-card__btn--download">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>{t('Download App')}</span>
                </a>
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <article className="project-card glass-panel project-card--gold">
              <div className="project-card__header">
                <div className="project-card__icon">🌌</div>
                <span className="project-card__category project-card__category--gold">
                  {t('3D Experience')}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t('A 3D Journey Through The Solar System')}</h3>
                <p className="project-card__description">
                  {t('Learn about the solar system in Arabic.')}
                </p>

                <div className="project-card__tech">
                  <span className="project-card__tech-tag">React Three Fiber</span>
                  <span className="project-card__tech-tag">Three.js</span>
                  <span className="project-card__tech-tag">WebGL</span>
                </div>
              </div>

              <div className="project-card__footer">
                <a href="https://morning-rain-ca32.nashedabdalrzak.workers.dev/" className="project-card__btn project-card__btn--primary">
                  <span>{t('Live Demo')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          </RevealOnScroll>

        </div>

        <RevealOnScroll delay={200}>
          <div className="projects__cta glass-panel">
            <div className="projects__cta-content">
              <h2 className="projects__cta-title">
                {t('Have a project in')} <span className="text-gradient-gold">{t('mind?')}</span>
              </h2>
              <p className="projects__cta-text">
                {t("Let's collaborate and bring your ideas to life with clean code and great design.")}
              </p>
            </div>
            <a href="#contact" className="projects__cta-btn">
              <span>{t('Start a Project')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Projects;