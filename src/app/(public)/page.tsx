import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/Hero";
import { FocusCards } from "@/components/sections/FocusCards";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { AchievementsGrid } from "@/components/sections/AchievementsGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Contact } from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [about, projects, skills, achievements, experiences, education, reviews] =
    await Promise.all([
      prisma.about.findUnique({ where: { id: 1 } }),
      prisma.project.findMany({
        where: { visible: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.skill.findMany({
        where: { visible: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.achievement.findMany({
        where: { visible: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.experience.findMany({
        where: { visible: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.education.findMany({
        where: { visible: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.review.findMany({
        where: { status: "approved" },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  if (!about) return <p>Loading...</p>;

  // Serialize dates for client components
  const serialize = <T extends Record<string, unknown>>(items: T[]) =>
    items.map((item) => {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(item)) {
        result[key] = value instanceof Date ? value.toISOString() : value;
      }
      return result as T;
    });

  const serializedAbout = {
    ...about,
    updatedAt: undefined,
  };

  return (
    <>
      <Hero about={serializedAbout as never} skills={serialize(skills) as never} />
      <FocusCards />
      <ProjectsGrid projects={serialize(projects) as never} />
      <ExperienceTimeline experiences={serialize(experiences) as never} />
      <EducationTimeline education={serialize(education) as never} />
      <AchievementsGrid achievements={serialize(achievements) as never} />
      <ReviewsSection reviews={serialize(reviews) as never} />
      <Contact about={serializedAbout as never} />
    </>
  );
}
