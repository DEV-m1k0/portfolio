import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 12);
  await prisma.admin.upsert({
    where: { id: 1 },
    update: { passwordHash },
    create: { id: 1, passwordHash },
  });

  // Seed about
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nameRu: "Антон Князев",
      nameEn: "Anton Knyazev",
      titleRu: "Backend-разработчик",
      titleEn: "Backend Developer",
      subtitleRu:
        "Веб-разработчик. Специализируюсь на backend для бизнес-проектов: архитектура, API, интеграции, стабильность и масштабирование.",
      subtitleEn:
        "Web developer. Specializing in backend for business projects: architecture, APIs, integrations, stability and scaling.",
      telegramHandle: "@crystal_cast1e",
      telegramUrl: "https://t.me/crystal_cast1e",
      email: "knyzevanton8@gmail.com",
      availableForWork: true,
    },
  });

  // Seed projects
  const projects = [
    {
      titleRu: "HedgehogCRM2",
      titleEn: "HedgehogCRM2",
      descRu: "CRM для IT-академии Hedgehog: календарь преподавателей, воронка продаж, мониторинг логов и админ-панели.",
      descEn: "CRM for Hedgehog IT Academy: teacher calendar, sales funnel, log monitoring and admin panels.",
      stack: JSON.stringify(["Python", "TypeScript", "HTML/CSS", "FastAPI", "SQLAlchemy", "SQLite", "React", "FullCalendar", "Recharts"]),
      githubUrl: "https://github.com/DEV-m1k0/HedgehogCRM2",
      statusRu: "В процессе",
      statusEn: "In Progress",
      sortOrder: 0,
    },
    {
      titleRu: "Volga-IT 2024 Web API",
      titleEn: "Volga-IT 2024 Web API",
      descRu: "API-проект для Volga-IT 2024 с JWT-аутентификацией и логированием.",
      descEn: "API project for Volga-IT 2024 with JWT authentication and logging.",
      stack: JSON.stringify(["Django", "DRF", "JWT", "PostgreSQL", "Docker", "Elasticsearch", "Kibana", "pytest"]),
      githubUrl: "https://github.com/DEV-m1k0/Volga-it-2024-Web-API",
      statusRu: "В процессе",
      statusEn: "In Progress",
      sortOrder: 1,
    },
    {
      titleRu: "Epiphany",
      titleEn: "Epiphany",
      descRu: "Совместная разработка онлайн-системы наподобие Word/Excel для программистов.",
      descEn: "Collaborative development of an online Word/Excel-like system for programmers.",
      stack: JSON.stringify(["Python", "TypeScript", "HTML/CSS", "React", "Three.js", "Anime.js", "Bootstrap Icons"]),
      githubUrl: "https://github.com/DEV-m1k0/Epiphany",
      statusRu: "В процессе",
      statusEn: "In Progress",
      sortOrder: 2,
    },
    {
      titleRu: "DentCare",
      titleEn: "DentCare",
      descRu: "Стоматологический сайт с онлайн-записью на приемы к врачам.",
      descEn: "Dental website with online appointment booking.",
      stack: JSON.stringify(["Python", "JavaScript", "HTML/CSS", "Django", "DRF", "Bootstrap", "Crispy Bootstrap 4", "Django Background Tasks"]),
      githubUrl: "https://github.com/DEV-m1k0/DentCare",
      statusRu: "Доделан",
      statusEn: "Completed",
      sortOrder: 3,
    },
    {
      titleRu: "Kursk-News",
      titleEn: "Kursk-News",
      descRu: "Сайт публикации новостей в Курске.",
      descEn: "News publication website for Kursk.",
      stack: JSON.stringify(["Python", "JavaScript", "HTML/CSS", "Django", "DRF", "Django Background Tasks", "Bootstrap"]),
      githubUrl: "https://github.com/DEV-m1k0/Kursk-News",
      statusRu: "Доделан",
      statusEn: "Completed",
      sortOrder: 4,
    },
    {
      titleRu: "Courses",
      titleEn: "Courses",
      descRu: "Платформа для прохождения онлайн-курсов.",
      descEn: "Platform for taking online courses.",
      stack: JSON.stringify(["Python", "JavaScript", "HTML/CSS", "Django", "Django CodeMirror", "DRF", "Bootstrap"]),
      githubUrl: "https://github.com/DEV-m1k0/courses",
      statusRu: "В процессе",
      statusEn: "In Progress",
      sortOrder: 5,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  // Seed skills
  const skills = [
    { name: "React", category: "frontend", sortOrder: 0 },
    { name: "TypeScript", category: "frontend", sortOrder: 1 },
    { name: "Python", category: "backend", sortOrder: 2 },
    { name: "FastAPI", category: "backend", sortOrder: 3 },
    { name: "Flask", category: "backend", sortOrder: 4 },
    { name: "Django/DRF", category: "backend", sortOrder: 5 },
    { name: "Kafka", category: "backend", sortOrder: 6 },
    { name: "Redis", category: "backend", sortOrder: 7 },
    { name: "PostgreSQL", category: "backend", sortOrder: 8 },
    { name: "SQLite", category: "backend", sortOrder: 9 },
    { name: "Docker", category: "devops", sortOrder: 10 },
    { name: "Pandas", category: "data", sortOrder: 11 },
    { name: "Matplotlib", category: "data", sortOrder: 12 },
    { name: "Seaborn", category: "data", sortOrder: 13 },
    { name: "scikit-learn", category: "data", sortOrder: 14 },
    { name: "HTML/CSS", category: "frontend", sortOrder: 15 },
    { name: "Bootstrap", category: "frontend", sortOrder: 16 },
    { name: "Elasticsearch", category: "devops", sortOrder: 17 },
    { name: "Kibana", category: "devops", sortOrder: 18 },
    { name: "Grafana", category: "devops", sortOrder: 19 },
    { name: "Prometheus", category: "devops", sortOrder: 20 },
    { name: "Traefik", category: "devops", sortOrder: 21 },
    { name: "JWT", category: "backend", sortOrder: 22 },
  ];

  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }

  // Seed achievements
  await prisma.achievement.create({
    data: {
      titleRu: "Volga-IT 2024 Web API",
      titleEn: "Volga-IT 2024 Web API",
      items: JSON.stringify([
        { textRu: "2 место в отборе на международный этап", textEn: "2nd place in international stage qualification" },
        { textRu: "7 место на международном этапе", textEn: "7th place at international stage" },
      ]),
      sortOrder: 0,
    },
  });

  await prisma.achievement.create({
    data: {
      titleRu: "Профессионалы 2025",
      titleEn: "Professionals 2025",
      items: JSON.stringify([
        { textRu: "2 место на региональном этапе", textEn: "2nd place at regional stage" },
        { textRu: "Участие во всероссийском этапе", textEn: "Participation in all-Russian stage" },
      ]),
      sortOrder: 1,
    },
  });

  // Seed experience
  await prisma.experience.create({
    data: {
      companyRu: "Академия IT-профессий Hedgehog",
      companyEn: "Hedgehog IT Academy",
      positionRu: "Преподаватель Python-разработки и Веб-дизайна",
      positionEn: "Python Development & Web Design Teacher",
      descRu: "Преподавание направлений \"Python-разработка\" и \"Веб-дизайн\" для детей и подростков.",
      descEn: "Teaching Python development and Web design courses for children and teenagers.",
      location: "Курск",
      startDate: new Date("2025-06-01"),
      endDate: null,
      sortOrder: 0,
    },
  });

  // Seed education (placeholder)
  await prisma.education.create({
    data: {
      institutionRu: "Учебное заведение",
      institutionEn: "Educational Institution",
      degreeRu: "Студент",
      degreeEn: "Student",
      fieldRu: "Информационные технологии",
      fieldEn: "Information Technology",
      startDate: new Date("2023-09-01"),
      endDate: null,
      sortOrder: 0,
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
