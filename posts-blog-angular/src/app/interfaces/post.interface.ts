import { User } from "./user.interface";

export interface Post {
  title?: string;
  content?: string;
  image?: string | File;
  timestamp?: number;
  user?: User;
  _id?: string;
}
