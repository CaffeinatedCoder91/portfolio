export type TokenColor = 'ai' | 'shu' | 'mizu' | 'fuji' | 'matcha' | 'kincha';

export interface Fact {
  num: string;
  label: string;
}

export interface Skill {
  name: string;
  color: TokenColor;
  items: string[];
}

export interface Project {
  title: string;
  category: string;
  blurb: string;
  tags: string[];
  points: string[];
  image?: string;
  images?: string[];
  live?: string;
  code?: string;
  note?: string;
}

export interface Role {
  period: string;
  role: string;
  org: string;
  color: TokenColor;
  desc?: string;
  points?: string[];
}

export interface Education {
  period: string;
  role: string;
  org: string;
  color: TokenColor;
  desc?: string;
}

export interface ContactItem {
  kind: string;
  color: TokenColor;
  glyph: string;
  value: string;
  href: string;
}
