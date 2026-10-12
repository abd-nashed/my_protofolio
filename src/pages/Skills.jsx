import React, { useEffect, useRef, useState, useMemo } from 'react';
import SkillsBubbles from '../components/SkillsBubbles';
import '../styles/Skills.css';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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

const SKILL_CATEGORIES = [
  {
    title: 'Frontend & Mobile',
    color: 'gold',
    skills: ['React', 'React Native', 'TypeScript', 'Three.js', 'CSS'],
  },
  {
    title: 'Backend & API',
    color: 'blue',
    skills: ['Django', 'Django REST', 'Python', 'PostgreSQL', 'GraphQL'],
  },
  {
    title: 'Game Dev & Tools',
    color: 'gold',
    skills: ['Unreal Engine', 'Blueprint', 'C++', 'Git', 'Docker'],
  },
];

const Skills = () => {
  const lang = useSelector((state) => state.lang.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <section id="skills" className="skills" style={{ direction: 'ltr' }}>
      <div className="skills__glow skills__glow--gold"></div>
      <div className="skills__glow skills__glow--blue"></div>

      <div className="skills__container">

        <div className="skills__header">
          <RevealOnScroll>
            <span className="skills__subtitle">{t('MY EXPERTISE')}</span>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="skills__title">
              {t('Skills &')}{' '}
              <span className="text-gradient-gold">{t('Technologies')}</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="skills__description">
              {t(
                ' A curated set of tools and technologies I use to build modern, scalable, and beautiful digital products. Hover over the bubbles to interact with them.'
              )}
            </p>
          </RevealOnScroll>
        </div>

        <div className="skills__bubbles-wrapper">
          <SkillsBubbles />
        </div>

        <div className="skills__categories">
          {SKILL_CATEGORIES.map((category, index) => (
            <RevealOnScroll key={category.title} delay={index * 150}>
              <div className="skills__category glass-panel">
                <h3
                  className={`skills__category-title skills__category-title--${category.color}`}
                >
                  {category.title}
                </h3>
                <ul className="skills__category-list">
                  {category.skills.map((skill) => (
                    <li key={skill} className="skills__category-item">
                      <span className="skills__category-dot"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="skills__marquee">
          <div className="skills__marquee-track">
            {[
              ...SKILL_CATEGORIES.flatMap((c) => c.skills),
              ...SKILL_CATEGORIES.flatMap((c) => c.skills),
            ].map((skill, i) => (
              <span key={i} className="skills__marquee-item">
                {skill}
                <span className="skills__marquee-separator">✦</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;