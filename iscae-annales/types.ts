export enum Category {
  MATHS = 'Mathématiques',
  GESTION = 'Gestion'
}

export enum Source {
  ECT = 'Prépa ECT',
  ECS = 'Prépa ECS'
}

export interface Document {
  id: string;
  title: string;
  category: Category;
  source: Source;
  year: number;
  url: string; // In a real app, this would be a file path. Here we use external links.
  addedBy: string;
  dateAdded: string;
}

export interface Quote {
  text: string;
  author: string;
}

export const QUOTES: Quote[] = [
  { text: "Le savoir est la seule matière qui s'accroît quand on la partage.", author: "Socrate" },
  { text: "L'éducation est l'arme la plus puissante pour changer le monde.", author: "Nelson Mandela" },
  { text: "Le partage est l'essence même de la réussite collective.", author: "Groupe ISCAE" },
];