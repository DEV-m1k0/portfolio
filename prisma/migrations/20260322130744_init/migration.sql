-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "nameRu" TEXT NOT NULL DEFAULT 'Антон Князев',
    "nameEn" TEXT NOT NULL DEFAULT 'Anton Knyazev',
    "titleRu" TEXT NOT NULL DEFAULT 'Backend-разработчик',
    "titleEn" TEXT NOT NULL DEFAULT 'Backend Developer',
    "subtitleRu" TEXT NOT NULL DEFAULT 'Веб-разработчик. Специализируюсь на backend для бизнес-проектов.',
    "subtitleEn" TEXT NOT NULL DEFAULT 'Web developer. Specializing in backend for business projects.',
    "telegramHandle" TEXT NOT NULL DEFAULT '@crystal_cast1e',
    "telegramUrl" TEXT NOT NULL DEFAULT 'https://t.me/crystal_cast1e',
    "email" TEXT NOT NULL DEFAULT 'knyzevanton8@gmail.com',
    "avatarUrl" TEXT,
    "availableForWork" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descRu" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "liveUrl" TEXT,
    "statusRu" TEXT NOT NULL,
    "statusEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyRu" TEXT NOT NULL,
    "companyEn" TEXT NOT NULL,
    "positionRu" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "descRu" TEXT,
    "descEn" TEXT,
    "location" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institutionRu" TEXT NOT NULL,
    "institutionEn" TEXT NOT NULL,
    "degreeRu" TEXT NOT NULL,
    "degreeEn" TEXT NOT NULL,
    "fieldRu" TEXT,
    "fieldEn" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "textRu" TEXT NOT NULL,
    "textEn" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "passwordHash" TEXT NOT NULL
);
