export interface NewsReactions {
  likes: number;
  dislikes: number;
}

export interface NewsPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: NewsReactions;
  views: number;
  userId: number;
}

export interface NewsApiResponse {
  posts: NewsPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface NewsSearchParams {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: 'title' | 'id' | 'userId' | 'views';
  order?: 'asc' | 'desc';
  select?: string;
  selectedTags?: string[]; 
}

export interface NewsFilters {
  search: string;
  selectedTags: string[];
  sortBy: 'title' | 'id' | 'userId' | 'views';
  sortOrder: 'asc' | 'desc';
}