import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import "./App.css"

import QRCode from "./assets/qrcode-tg.png"

const topProjects = [
  {
    title: "HedgehogCRM2",
    desc: "CRM для IT‑академии Hedgehog: календарь преподавателей, воронка продаж, мониторинг логов и админ‑панели.",
    stack: ["Python", "TypeScript", "HTML/CSS", "FastAPI", "SQLAlchemy", "SQLite", "React", "FullCalendar", "Recharts"],
    github: "https://github.com/DEV-m1k0/HedgehogCRM2",
    status: "В процессе",
  },
  {
    title: "Volga-IT 2024 Web API",
    desc: "API‑проект для Volga‑IT 2024 с JWT‑аутентификацией и логированием.",
    stack: ["Django", "DRF", "JWT", "PostgreSQL", "Docker", "Elasticsearch", "Kibana", "pytest"],
    github: "https://github.com/DEV-m1k0/Volga-it-2024-Web-API",
    status: "В процессе",
  },
  {
    title: "Epiphany",
    desc: "Совместная разработка онлайн‑системы наподобие Word/Excel для программистов.",
    stack: ["Python", "TypeScript", "HTML/CSS", "React", "Three.js", "Anime.js", "Bootstrap Icons"],
    github: "https://github.com/DEV-m1k0/Epiphany",
    status: "В процессе",
  },
  {
    title: "DentCare",
    desc: "Стоматологический сайт с онлайн‑записью на приемы к врачам.",
    stack: ["Python", "JavaScript", "HTML/CSS", "Django", "DRF", "Bootstrap", "Crispy Bootstrap 4", "Django Background Tasks"],
    github: "https://github.com/DEV-m1k0/DentCare",
    status: "Доделан",
  },
  {
    title: "Kursk-News",
    desc: "Сайт публикации новостей в Курске.",
    stack: ["Python", "JavaScript", "HTML/CSS", "Django", "DRF", "Django Background Tasks", "Bootstrap"],
    github: "https://github.com/DEV-m1k0/Kursk-News",
    status: "Доделан",
  },
  {
    title: "Courses",
    desc: "Платформа для прохождения онлайн‑курсов.",
    stack: ["Python", "JavaScript", "HTML/CSS", "Django", "Django CodeMirror", "DRF", "Bootstrap"],
    github: "https://github.com/DEV-m1k0/courses",
    status: "В процессе",
  }
]

const achievements = [
  {
    title: "Volga-IT 2024 Web API",
    items: [
      "2 место в отборе на международный этап",
      "7 место на международном этапе",
    ],
  },
  {
    title: "Профессионалы 2025",
    items: [
      "2 место на региональном этапе",
      "Участие во всероссийском этапе",
    ],
  },
]

const skills = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Flask",
  "Django/DRF",
  "Kafka",
  "Redis",
  "PostgreSQL",
  "SQLite",
  "Docker",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "scikit‑learn",
  "HTML/CSS",
  "Bootstrap",
  "Elasticsearch",
  "Kibana",
  "Grafana",
  "Prometheus",
  "Traefik",
  "JWT",
]

const telegram = {
  handle: "@crystal_cast1e",
  url: "https://t.me/crystal_cast1e",
}

const easeCurve = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: easeCurve },
  }),
}

function App() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const openRepo = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>, url: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openRepo(url)
    }
  }

  return (
    <div className="page">
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setShowIntro(false)}
          >
            <motion.div
              className="intro-card"
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            >
              <span className="intro-kicker">Добро пожаловать</span>
              <h2>сайт‑визитка</h2>
              <p>Backend‑разработка для бизнес‑проектов</p>
              <span className="intro-hint">Нажмите, чтобы продолжить</span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="bg">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grain" />
      </div>

      <motion.main
        className="wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={showIntro ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeCurve }}
      >
        <motion.header
          className="glass hero"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-top">
                <span className="pill">Доступен для проектов</span>
                <span className="ping" />
              </div>
              <h1>
                Антон <span>Князев</span>
              </h1>
              <p className="subtitle">
                Веб‑разработчик. Специализируюсь на backend для бизнес‑проектов:
                архитектура, API, интеграции, стабильность и масштабирование.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#contact">
                  Нанять меня
                </a>
                <a className="btn ghost" href="#top-projects">
                  Топ проекты
                </a>
              </div>
              <div className="meta">
                <span>Backend‑фокус</span>
                <span>Бизнес‑проекты</span>
                <span>Python / Django / FastAPI</span>
                <span>Telegram: {telegram.handle}</span>
              </div>
            </div>

            <div className="hero-right">
              <div className="glass mini-card">
                <div className="mini-head">
                  <span>Сейчас в работе</span>
                  <strong>3 продукта</strong>
                </div>
                <div className="pulse-bar" />
                <div className="mini-metrics">
                  <div>
                    <strong>6</strong>
                    <span>ключевых проектов</span>
                  </div>
                  <div>
                    <strong>Backend</strong>
                    <span>специализация</span>
                  </div>
                  <div>
                    <strong>API</strong>
                    <span>интеграции</span>
                  </div>
                </div>
              </div>
              <div className="glass mini-card alt">
                <h3>Был опыт работы</h3>
                <ul className="chips">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="grid">
          <motion.div
            className="glass card focus"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2>Фокус</h2>
            <p>
              Разработка backend‑части: проектирование API, интеграции, безопасность,
              очереди и хранилища данных.
            </p>
          </motion.div>

          <motion.div
            className="glass card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <h2>Подход</h2>
            <p>
              Строгая инженерная дисциплина, читаемая архитектура и надежность
              в продакшене.
            </p>
          </motion.div>

          <motion.div
            className="glass card accent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
          >
            <h2>Результаты</h2>
            <p>Стабильные релизы, предсказуемые сроки и понятные метрики.</p>
            <div className="stats">
              <div>
                <strong>Опыт</strong>
                <span>в бизнес‑проектах</span>
              </div>
              <div>
                <strong>Backend</strong>
                <span>масштабирование</span>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="top-projects" className="projects">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Топ проекты
          </motion.h2>
          <div className="project-grid">
            {topProjects.map((project, index) => (
              <motion.article
                key={project.title}
                className="glass project project-clickable"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeUp}
                onClick={() => openRepo(project.github)}
                onKeyDown={(event) => handleCardKeyDown(event, project.github)}
                role="link"
                tabIndex={0}
                aria-label={`Открыть ${project.title} на GitHub`}
              >
                <div className="project-head">
                  <h3>{project.title}</h3>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="link button"
                      onClick={(event) => event.stopPropagation()}
                    >
                      GitHub
                    </a>
                    <span className="status-badge ghost">{project.status}</span>
                  </div>
                </div>
                <p>{project.desc}</p>
                <div className="tags">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="achievements">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Достижения
          </motion.h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement.title}
                className="glass achievement-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeUp}
              >
                <h3>{achievement.title}</h3>
                <ul>
                  {achievement.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          id="contact"
          className="glass contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div>
            <h2>Связаться</h2>
            <p>
              Открыт к предложениям по продуктовой разработке и контрактам.
              Отвечаю в течение 24 часов.
            </p>
          </div>
          <div className="contact-actions">
            <a className="btn ghost telegram" href={telegram.url} target="_blank" aria-label="Telegram">
              <span className="icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M21.8 4.3c.3-1.2-1.1-2.2-2.2-1.6L3.2 9.6c-1.3.6-1.2 2.5.1 2.9l4.7 1.6 1.8 5.3c.4 1.3 2.2 1.5 2.9.3l2.5-4.2 4.6 3.4c1.1.8 2.6.1 2.9-1.2l2.9-12.4ZM8.6 13.7l9.6-6.1-7.7 7.5-.3 3.6-1.5-4.2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              {telegram.handle}
            </a>
          </div>
          <div className="email-box">
            <span className="label">Почта</span>
            <a href="mailto:knyzevanton8@gmail.com">knyzevanton8@gmail.com</a>
          </div>
          <div className="glass qr-card">
            <img src={QRCode} alt="Telegram QR" className="qr-image" />
            <span>Сканируй для Telegram</span>
          </div>
        </motion.section>
      </motion.main>
    </div>
  )
}

export default App
