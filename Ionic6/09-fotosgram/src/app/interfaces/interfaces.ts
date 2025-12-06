export interface PostsResponse {
  ok: boolean;
  page: number;
  postsDB: PostsDB[];
}

export interface PostsDB {
  _id?: string;
  message?: string;
  imgs?: string[];
  coords?: string;
  user?: User;
  created?: Date;
}

export interface User {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
}
