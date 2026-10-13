import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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

const projectsList = [
  {
    id: 'comprehensive-store',
    icon: '🛒',
    categoryKey: 'Web Application',
    categoryClass: 'gold',
    titleKey: 'Comprehensive Store',
    descriptionKey:
      'A comprehensive e-commerce platform leveraging the power of Django REST Framework for the backend and React for the frontend. It supports product and store browsing and allows for guest checkout without registration, while featuring an advanced administrative dashboard (Superuser, Staff, Store, and Sales roles). The system utilizes JWT authentication with automatic token renewal, role-based permissions, and CORS domain protection.',
    tech: ['React', 'React Native', 'Redux', 'Django REST', 'Axios', 'Async'],
    liveUrl: 'https://solitary-salad-28cf.nashedabdalrzak.workers.dev/',
    downloadUrl:
      'https://github.com/abd-nashed/Comprehensive_e-commerce_store_app/releases/tag/v1.0.0',
  },
  {
    id: 'hotel-booking',
    icon: '🏨',
    categoryKey: 'Web Platform',
    categoryClass: 'blue',
    titleKey: 'Hotel Booking Platform',
    descriptionKey:
      'A multi-vendor hotel booking platform featuring a React frontend and a Django REST backend. It enables customers to browse hotels and rooms, check availability, make direct bookings, and communicate with hotel owners. Users can register to add and manage their own hotels and rooms, while the administrator has a comprehensive dashboard to oversee all bookings and properties, supported by an automated commission system for every booking.',
    tech: ['React', 'React Native', 'Redux', 'Django REST', 'Axios', 'Async'],
    liveUrl: 'https://restless-cloud-56ec.nashedabdalrzak.workers.dev/',
  },
  {
    id: '3d-cars',
    icon: '🏎️',
    categoryKey: '3D Interactive Tool',
    categoryClass: 'blue',
    titleKey: 'A professional way to showcase and customize cars.',
    descriptionKey: 'Take a look at 3D cars and customize them.',
    tech: ['React Three Fiber', 'Three.js', 'WebGL'],
    liveUrl: 'https://odd-meadow-393e.nashedabdalrzak.workers.dev/',
  },
  {
    id: 'photo-editor',
    icon: '🖼️',
    categoryKey: 'Web Application',
    categoryClass: 'blue',
    titleKey: 'Photo Editor',
    descriptionKey:
      'You can upload your photo, edit it, add filters, and then download the edited version. Note: It does not work with iPhone photos.',
    tech: ['React'],
    liveUrl: 'https://red-heart-a448.nashedabdalrzak.workers.dev/',
    downloadUrl:
      'https://github.com/abd-nashed/Photo_editor_app/releases/tag/v1.0.0',
  },
  {
    id: 'solar-system',
    icon: '🌌',
    categoryKey: '3D Experience',
    categoryClass: 'gold',
    titleKey: 'A 3D Journey Through The Solar System',
    descriptionKey: 'Learn about the solar system in Arabic.',
    tech: ['React Three Fiber', 'Three.js', 'WebGL'],
    liveUrl: 'https://morning-rain-ca32.nashedabdalrzak.workers.dev/',
  },
];

const Projects = () => {
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <section id="projects" className="projects">
      <div className="projects__glow projects__glow--gold"></div>
      <div className="projects__glow projects__glow--blue"></div>

      <div className="projects__container">
        <div className="projects__header">
          <RevealOnScroll>
            <span className="projects__subtitle">{t('MY WORK')}</span>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="projects__title">
              {t('Featured')}{' '}
              <span className="text-gradient-gold">{t('Projects')}</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="projects__description">
              {t(
                'A curated selection of projects that showcase my skills in web development, mobile apps, and immersive 3D experiences.'
              )}
            </p>
          </RevealOnScroll>
        </div>

        <div className="projects__grid">
          {projectsList.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100}>
              <article
                className={`project-card glass-panel project-card--${project.categoryClass}`}
              >
                <div className="project-card__header">
                  <div className="project-card__icon">{project.icon}</div>
                  <span
                    className={`project-card__category project-card__category--${project.categoryClass}`}
                  >
                    {t(project.categoryKey)}
                  </span>
                </div>

                <div className="project-card__body">
                  <h3 className="project-card__title">{t(project.titleKey)}</h3>
                  <p className="project-card__description">
                    {t(project.descriptionKey)}
                  </p>

                  <div className="project-card__tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="project-card__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-card__footer">
                  <Link
                    to={`/project/${project.id}`}
                    className="project-card__btn project-card__btn--primary"
                  >
                    <span>{t('Live Demo')}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__btn project-card__btn--visit"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span>{t('Visit Website')}</span>
                  </a>

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__btn project-card__btn--download"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>{t('Download App')}</span>
                    </a>
                  )}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={200}>
          <div className="projects__cta glass-panel">
            <div className="projects__cta-content">
              <h2 className="projects__cta-title">
                {t('Have a project in')}{' '}
                <span className="text-gradient-gold">{t('mind?')}</span>
              </h2>
              <p className="projects__cta-text">
                {t(
                  "Let's collaborate and bring your ideas to life with clean code and great design."
                )}
              </p>
            </div>
            <a href="#contact" className="projects__cta-btn">
              <span>{t('Start a Project')}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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