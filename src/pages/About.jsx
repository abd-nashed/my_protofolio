import React, { useEffect, useRef, useState } from 'react';
import Earth3D from '../components/Earth3D';
import '../styles/About.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// مكون فرعي للأنيميشن عند التمرير
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

const About = () => {
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);
  return (
    <section id="about" className="about">
      {/* خلفية متوهجة */}
      <div className="about__glow about__glow--gold"></div>
      <div className="about__glow about__glow--blue"></div>

      <div className="about__container">

        {/* القسم الأول: النص + الكرة الأرضية */}
        <div className="about__hero">

          {/* النص على اليسار */}
          <div className="about__text">
            <RevealOnScroll>
              <span className="about__subtitle">{t('ABOUT ME')}</span>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <h1 className="about__title">
                {t('Building Digital')} <br />
                <span className="text-gradient-gold">{t('Experiences')}</span> <br />
                {t('Worldwide')}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="about__description">
                {t("I'm a passionate Full Stack Developer with expertise in building scalable web and mobile applications. I combine clean code with creative design to deliver exceptional digital experiences that make a real impact.")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="about__stats">
                <div className="about__stat">
                  <span className="about__stat-number">3+</span>
                  <span className="about__stat-label">{t('Years Experience')}</span>
                </div>
                <div className="about__stat">
                  <span className="about__stat-number">10+</span>
                  <span className="about__stat-label">{t('Projects Done')}</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* الكرة الأرضية على اليمين */}
          <div className="about__earth">
            <Earth3D />
          </div>

        </div>

        {/* القسم الثاني: رحلتي  */}
        <div className="about__journey">
          <RevealOnScroll>
            <h2 className="about__section-title">
              {t("My")} <span className="text-gradient-blue">{t('Journey')}</span>
            </h2>
          </RevealOnScroll>

          <div className="about__timeline">

            <RevealOnScroll delay={100}>
              <div className="about__timeline-item">
                <div className="about__timeline-dot"></div>
                <div className="about__timeline-content glass-panel">
                  <span className="about__timeline-year">{t('2026 - Present')}</span>
                  <h3>{t('Senior Full Stack Developer')}</h3>
                  <p>{t('Leading development of complex web applications using React, Django, and React Native.')}</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="about__timeline-item">
                <div className="about__timeline-dot"></div>
                <div className="about__timeline-content glass-panel">
                  <span className="about__timeline-year">2024-2025</span>
                  <h3>{t('Full Stack Developer')}</h3>
                  <p>{t('Built and maintained scalable REST APIs and modern frontend interfaces for various clients.')}</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="about__timeline-item">
                <div className="about__timeline-dot"></div>
                <div className="about__timeline-content glass-panel">
                  <span className="about__timeline-year">2023-2024</span>
                  <h3>{t('Junior Developer')}</h3>
                  <p>{t('Started my journey in web development, mastering the fundamentals of programming and design.')}</p>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>

        {/* القسم الثالث: ما أقدمه */}
        <div className="about__services">
          <RevealOnScroll>
            <h2 className="about__section-title">
              {t('What I')} <span className="text-gradient-gold">{t('Do')}</span>
            </h2>
          </RevealOnScroll>

          <div className="about__services-grid">
            <RevealOnScroll delay={100}>
              <div className="about__service-card glass-panel">
                <div className="about__service-icon">💻</div>
                <h3>{t('Web Development')}</h3>
                <p>{t('Modern, responsive web applications built with React and Django.')}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="about__service-card glass-panel">
                <div className="about__service-icon">📱</div>
                <h3>{t('Mobile Apps')}</h3>
                <p>{t('Cross-platform mobile apps using React Native for iOS and Android.')}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="about__service-card glass-panel">
                <div className="about__service-icon">🎨</div>
                <h3>{t('3D Experiences')}</h3>
                <p>{t('Immersive 3D web experiences using React Three Fiber and WebGL.')}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="about__service-card glass-panel">
                <div className="about__service-icon">⚙️</div>
                <h3>{t('REST APIs')}</h3>
                <p>{t('Scalable backend solutions and RESTful APIs with Django REST Framework.')}</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;