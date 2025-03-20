export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  path: string;
  emoji: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  xp: number;
}