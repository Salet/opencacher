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

export interface CacheLog {
  uuid: string;
  date: string;
  type: string;
  comment: string;
  user: {
    uuid: string;
    username: string;
    profile_url: string;
  };
}

export interface CacheDetailsExtended extends CacheDetailsWithDistance {
  description: string;
  latest_logs: Array<CacheLog>;
}
