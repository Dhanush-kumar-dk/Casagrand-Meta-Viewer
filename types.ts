export type ViewType = '1bhk' | '2bhk' | '3bhk' | '4bhk' | '5bhk' | 'interior' | 'exterior' | 'aerial';

export interface ViewLink {
  type: ViewType;
  url: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  thumbnail: string;
  views: ViewLink[];
}

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}