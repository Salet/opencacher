export interface CacheDetails {
  distance: number;
  code: string;
  name: string;
  location: string;
  status: string;
  type: string;
  size2: string;
  difficulty: number;
  terrain: number;
  rating: number;
  recommendations: number;
}

export interface CacheDetailsWithDistance extends CacheDetails {
  distance: number;
}
