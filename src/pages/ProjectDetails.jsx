import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import '../styles/ProjectDetails.css';

const projectsData = {
  'comprehensive-store': {
    icon: '🛒',
    category: 'Web Application',
    categoryClass: 'gold',
    title: 'Comprehensive Store',
    description:
      'A comprehensive e-commerce platform leveraging the power of Django REST Framework for the backend and React for the frontend. It supports product and store browsing and allows for guest checkout without registration, while featuring an advanced administrative dashboard (Superuser, Staff, Store, and Sales roles). The system utilizes JWT authentication with automatic token renewal, role-based permissions, and CORS domain protection.',
    fullDescription:
      'This comprehensive e-commerce platform was built to handle the complete shopping experience from browsing to checkout. The backend is powered by Django REST Framework with JWT authentication, while the frontend uses React with Redux for state management. The platform supports guest checkout, advanced admin dashboards, and role-based access control.',
    features: [
      'Guest checkout without registration',
      'Advanced administrative dashboard',
      'JWT authentication with auto token renewal',
      'Role-based permissions (Superuser, Staff, Store, Sales)',
      'CORS domain protection',
      'Product and store browsing',
      'React Native mobile app support',
    ],
    tech: ['React', 'React Native', 'Redux', 'Django REST', 'Axios', 'Async'],
    liveUrl: 'https://solitary-salad-28cf.nashedabdalrzak.workers.dev/',
    webCodeUrl: 'https://github.com/abd-nashed/A_fully_integrated_online_store_website',
    backendCodeUrl: 'https://github.com/abd-nashed/E-commerce_store_backend',
    downloadUrl:
      'https://github.com/abd-nashed/Comprehensive_e-commerce_store_app/releases/tag/v1.0.0',
    video: 'https://www.youtube.com/embed/J19T3P7aWYE',
    mobileApp: {
      codeUrl: 'https://github.com/abd-nashed/Comprehensive_e-commerce_store_app',
      downloadUrl:
        'https://github.com/abd-nashed/Comprehensive_e-commerce_store_app/releases/tag/v1.0.0',
      images: [
        '/store1.png',
        '/store2.png',
        '/store3.png',
        '/store4.png',
        '/store5.png',
        '/store6.png',
        '/store7.png',
      ],
    },
  },

  'hotel-booking': {
    icon: '🏨',
    category: 'Web Platform',
    categoryClass: 'blue',
    title: 'Hotel Booking Platform',
    description:
      'A multi-vendor hotel booking platform featuring a React frontend and a Django REST backend. It enables customers to browse hotels and rooms, check availability, make direct bookings, and communicate with hotel owners.',
    fullDescription:
      'A multi-vendor hotel booking platform featuring a React frontend and a Django REST backend. It enables customers to browse hotels and rooms, check availability, make direct bookings, and communicate with hotel owners. Users can register to add and manage their own hotels and rooms, while the administrator has a comprehensive dashboard to oversee all bookings and properties, supported by an automated commission system for every booking.',
    features: [
      'Multi-vendor hotel management',
      'Real-time availability checking',
      'Direct booking system',
      'Owner-customer communication',
      'User registration and hotel management',
      'Admin dashboard for all bookings',
      'Automated commission system',
    ],
    tech: ['React', 'React Native', 'Redux', 'Django REST', 'Axios', 'Async'],
    liveUrl: 'https://restless-cloud-56ec.nashedabdalrzak.workers.dev/',
    webCodeUrl: 'https://github.com/abd-nashed/your-web-project-code',
  },

  '3d-cars': {
    icon: '🏎️',
    category: '3D Interactive Tool',
    categoryClass: 'blue',
    title: 'A professional way to showcase and customize cars.',
    description: 'Take a look at 3D cars and customize them.',
    fullDescription:
      'An immersive 3D car showcase and customization tool built with React Three Fiber and Three.js. Users can explore detailed 3D car models, customize colors, parts, and see real-time rendering of their changes in a WebGL-powered environment.',
    features: [
      'Interactive 3D car models',
      'Real-time customization',
      'Color selection',
      'WebGL-powered rendering',
      'Smooth camera controls',
      'High-quality lighting and materials',
    ],
    tech: ['React Three Fiber', 'Three.js', 'WebGL'],
    liveUrl: 'https://odd-meadow-393e.nashedabdalrzak.workers.dev/',
    webCodeUrl: 'https://github.com/abd-nashed/Car_modification_website',
    video: 'https://www.youtube.com/embed/jHxm4eQhhyE',
  },

  'photo-editor': {
    icon: '🖼️',
    category: 'Web Application',
    categoryClass: 'blue',
    title: 'Photo Editor',
    description:
      'You can upload your photo, edit it, add filters, and then download the edited version. Note: It does not work with iPhone photos.',
    fullDescription:
      'A web-based photo editor that allows users to upload images, apply various filters and edits, and download the final result. Built entirely with React, it provides a smooth and intuitive editing experience directly in the browser. Note: It does not work with iPhone photos due to format compatibility.',
    features: [
      'Photo upload from device',
      'Multiple filters and effects',
      'Real-time preview',
      'Download edited images',
      'User-friendly interface',
      'No server-side processing needed',
    ],
    tech: ['React'],
    liveUrl: 'https://red-heart-a448.nashedabdalrzak.workers.dev/',
    webCodeUrl: 'https://github.com/abd-nashed/Photo_editing_website',
    downloadUrl:
      'https://github.com/abd-nashed/Photo_editor_app/releases/tag/v1.0.0',
    video: 'https://www.youtube.com/embed/_dKZCDWaid4',
    mobileApp: {
      codeUrl: 'https://github.com/abd-nashed/Photo_editor_app',
      downloadUrl:
        'https://github.com/abd-nashed/Photo_editor_app/releases/tag/v1.0.0',
      images: ['/photo1.png', '/photo2.png'],
    },
  },

  'solar-system': {
    icon: '🌌',
    category: '3D Experience',
    categoryClass: 'gold',
    title: 'A 3D Journey Through The Solar System',
    description: 'Learn about the solar system in Arabic.',
    fullDescription:
      'An educational 3D experience that takes you on a journey through our solar system. Built with React Three Fiber and Three.js, it provides an interactive way to learn about planets, their orbits, and characteristics, all presented in Arabic.',
    features: [
      'Interactive 3D solar system',
      'Textures of some realistic planets',
      'Orbital mechanics simulation',
      'Smooth navigation between planets',
      'Educational information panels',
    ],
    tech: ['React Three Fiber', 'Three.js', 'WebGL'],
    liveUrl: 'https://morning-rain-ca32.nashedabdalrzak.workers.dev/',
    webCodeUrl: 'https://github.com/abd-nashed/The_Solar_System',
    video: 'https://www.youtube.com/embed/TdfNm_JRd-E',
  },
};

const ImageGallery = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeLightbox = () => setActiveIndex(null);
  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="project-details__gallery">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            className="project-details__gallery-item"
            onClick={() => setActiveIndex(index)}
            aria-label={`${title} - image ${index + 1}`}
          >
            <img src={img} alt={`${title} ${index + 1}`} loading="lazy" />
            <span className="project-details__gallery-zoom">🔍</span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="project-details__lightbox" onClick={closeLightbox}>
          <button
            className="project-details__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="project-details__lightbox-nav project-details__lightbox-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={images[activeIndex]}
            alt={`${title} ${activeIndex + 1}`}
            className="project-details__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="project-details__lightbox-nav project-details__lightbox-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next"
          >
            ›
          </button>
          <span className="project-details__lightbox-counter">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
};

const VideoPlayer = ({ src, title }) => {
  if (!src) return null;

  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

  return (
    <div className="project-details__video">
      {isYouTube ? (
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={src} controls preload="metadata">
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();

  const project = projectsData[projectId];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToHomeSection = (section) => {
    navigate('/');
    setTimeout(() => scrollToSection(section), 200);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
    window.scrollTo(0, 0);
  }, [lang, i18n]);

  if (!project) {
    return (
      <section className="project-details">
        <div className="project-details__container">
          <h1>{t('Project not found')}</h1>
          <button
            type="button"
            onClick={() => goToHomeSection('projects')}
            className="project-details__back-btn"
          >
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="project-details">
      <div
        className={`project-details__glow project-details__glow--${project.categoryClass}`}
      ></div>

      <div className="project-details__container">
        <button type="button" onClick={() => goToHomeSection('projects')} className="project-details__back">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back</span>
        </button>

        <div className="project-details__header">
          <div className="project-details__icon">{project.icon}</div>
          <span
            className={`project-details__category project-details__category--${project.categoryClass}`}
          >
            {t(project.category)}
          </span>
          <h1 className="project-details__title">{t(project.title)}</h1>
          <p className="project-details__description">{t(project.description)}</p>

          <div className="project-details__actions">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-details__btn project-details__btn--primary"
            >
              <svg
                width="18"
                height="18"
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

            <a
              href={project.webCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-details__btn project-details__btn--source"
            >
              <span>رؤية الأكواد</span>
            </a>

            {project.backendCodeUrl && (
              <a
                href={project.backendCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-details__btn project-details__btn--source"
              >
                <span>رؤية أكواد الواجهة الخلفية</span>
              </a>
            )}

            {project.downloadUrl && (
              <a
                href={project.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-details__btn project-details__btn--download"
              >
                <svg
                  width="18"
                  height="18"
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
        </div>

        <div className="project-details__content">
          <div className="project-details__section glass-panel">
            <h2 className="project-details__section-title">
              {t('About This Project')}
            </h2>
            <p className="project-details__section-text">
              {t(project.fullDescription)}
            </p>
          </div>

          {project.video && (
            <div className="project-details__section glass-panel">
              <h2 className="project-details__section-title">
                {t('Project Demo Video')}
              </h2>
              <VideoPlayer src={project.video} title={project.title} />
            </div>
          )}

          <div className="project-details__section glass-panel">
            <h2 className="project-details__section-title">
              {t('Key Features')}
            </h2>
            <ul className="project-details__features">
              {project.features.map((feature, index) => (
                <li key={index} className="project-details__feature">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t(feature)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="project-details__section glass-panel">
            <h2 className="project-details__section-title">
              {t('Technologies Used')}
            </h2>
            <div className="project-details__tech">
              {project.tech.map((tech, index) => (
                <span key={index} className="project-details__tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.mobileApp && (
            <div className="project-details__mobile glass-panel">
              <div className="project-details__mobile-header">
                <span className="project-details__mobile-badge">
                  📱 {t('Mobile App')}
                </span>
                <h2 className="project-details__mobile-title">
                  {t('Download the Mobile App')}
                </h2>
                <p className="project-details__mobile-text">
                  {t(
                    'Get the full experience on your phone. Download the app now and enjoy all features on the go.'
                  )}
                </p>

                {project.mobileApp.downloadUrl && (
                  <a
                    href={project.mobileApp.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-details__mobile-btn"
                  >
                    <svg
                      width="18"
                      height="18"
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

                <a
                  href={project.mobileApp.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-details__mobile-btn project-details__mobile-btn--source"
                >
                  <span>رؤية الأكواد</span>
                </a>
              </div>

              {project.mobileApp.images &&
                project.mobileApp.images.length > 0 && (
                  <div className="project-details__mobile-block">
                    <h3 className="project-details__mobile-subtitle">
                      {t('App Screenshots')}
                    </h3>
                    <ImageGallery
                      images={project.mobileApp.images}
                      title={`${project.title} Mobile`}
                    />
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="project-details__cta glass-panel">
          <h2 className="project-details__cta-title">
            {t('Interested in this project?')}
          </h2>
          <a href="/" className="project-details__cta-btn" onClick={(e) => {
            e.preventDefault();
            goToHomeSection('contact');
          }}>
            <span>{t('Get in Touch')}</span>
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
      </div>
    </section>
  );
};

export default ProjectDetails;