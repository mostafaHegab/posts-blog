import { User } from "./user.interface";
import { Post } from "./post.interface";

export interface APIResponse extends User, Post {
  error?: any;
}
