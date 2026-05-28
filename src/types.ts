export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  category: string;
  role: string;
  techList: string[];
  url?: string;
}

export interface WorkExperience {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  company: string;
}

export interface Gear {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  isFavorite: boolean;
  specs: string;
}
