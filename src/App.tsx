import { motion } from "framer-motion"
import "./App.css"

import QRCode from "./assets/qrcode-tg.png"

const topProjects = [
  {
    title: "HedgehogCRM2",
    desc: "CRM для IT‑академии Hedgehog: календарь преподавателей, воронка продаж, мониторинг логов и админ‑панели.",
    stack: ["Django", "DRF", "PostgreSQL", "Redis"],
    github: "https://github.com/DEV-m1k0/HedgehogCRM2",
    status: "В процессе",
  },
  {
    title: "Epiphany",
    desc: "Совместная разработка онлайн‑системы наподобие Word/Excel для программистов.",
    stack: ["FastAPI", "Kafka", "WebSockets"],
    github: "https://github.com/DEV-m1k0/Epiphany",
    status: "В процессе",
  },
  {
    title: "DentCare",
    desc: "Стоматологический сайт с онлайн‑записью на приемы к врачам.",
    stack: ["Django", "PostgreSQL", "Bootstrap"],
    github: "https://github.com/DEV-m1k0/DentCare",
    status: "Доделан",
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
]

const telegram = {
  handle: "@crystal_cast1e",
  url: "https://t.me/crystal_cast1e",
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

function App() {
  return (
    <div className="page">
      <div className="bg">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grain" />
      </div>

      <main className="wrap">
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
                    <strong>5</strong>
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
                <h3>Сильные стороны</h3>
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
            <div className="pill-row">
              <span>API‑дизайн</span>
              <span>Интеграции</span>
              <span>Производительность</span>
            </div>
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
            <div className="timeline">
              <span>Анализ</span>
              <span>Архитектура</span>
              <span>Production</span>
            </div>
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
                className="glass project"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeUp}
              >
                <div className="project-head">
                  <h3>{project.title}</h3>
                  <div className="project-links">
                    <a href={project.github} target="_blank" className="link">
                      GitHub
                    </a>
                    <span className="link ghost">{project.status}</span>
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
          <div className="project-list">
            <div className="glass project-line">
              <div>
                <h4>Kursk-News</h4>
                <p>Сайт публикации новостей в Курске.</p>
              </div>
              <a href="https://github.com/DEV-m1k0/Kursk-News" target="_blank" className="link">
                GitHub
              </a>
            </div>
            <div className="glass project-line">
              <div>
                <h4>Courses</h4>
                <p>Платформа для прохождения онлайн‑курсов.</p>
              </div>
              <a href="https://github.com/DEV-m1k0/courses" target="_blank" className="link">
                GitHub
              </a>
            </div>
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
            <a className="btn primary" href="mailto:knyzevanton8@gmail.com">
              knyzevanton8@gmail.com
            </a>
            <a className="btn ghost" href="https://github.com/DEV-m1k0" target="_blank">
              GitHub
            </a>
            <a className="btn ghost" href={telegram.url} target="_blank">
              {telegram.handle}
            </a>
          </div>
          <div className="glass qr-card">
            <img src={QRCode} alt="Telegram QR" className="qr-image" />
            <span>Сканируй для Telegram</span>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default App
