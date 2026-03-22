export interface About {
  id: number;
  nameRu: string;
  nameEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  telegramHandle: string;
  telegramUrl: string;
  email: string;
  avatarUrl: string | null;
  availableForWork: boolean;
}

export interface Project {
  id: number;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  stack: string[];
  githubUrl: string;
  liveUrl: string | null;
  statusRu: string;
  statusEn: string;
  sortOrder: number;
  visible: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface Achievement {
  id: number;
  titleRu: string;
  titleEn: string;
  items: string; // JSON
  sortOrder: number;
  visible: boolean;
}

export interface Experience {
  id: number;
  companyRu: string;
  companyEn: string;
  positionRu: string;
  positionEn: string;
  descRu: string | null;
  descEn: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface Education {
  id: number;
  institutionRu: string;
  institutionEn: string;
  degreeRu: string;
  degreeEn: string;
  fieldRu: string | null;
  fieldEn: string | null;
  startDate: string;
  endDate: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  textRu: string;
  textEn: string | null;
  rating: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
