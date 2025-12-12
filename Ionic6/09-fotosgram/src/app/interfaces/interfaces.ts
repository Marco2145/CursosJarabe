// POSTS RESPONSE
export interface GetPostsResponse {
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
  password?: string;
}

// LOGIN RESPONSE
export interface UserManageResponse {
  ok: boolean;
  token?: string;
  error?: string;
}

// TOKEN VALIDATION RESPONSE
export interface GetUserResponse {
  ok: boolean;
  user?: User;
  error?: string;
}

// SINGLE POST RESPONSE

export interface PostMyPostResponse {
  ok: boolean;
  post?: PostsDB;
  error?: string;
}
