import { Injectable } from "@angular/core";
import { API_ALL_POSTS, API_POSTS, API_ADD_POST } from "../utils/api.util";
import { Observable } from "rxjs";
import { APIResponse } from "../interfaces/api.interface";
import { HttpClient } from "@angular/common/http";
import { Post } from "../interfaces/post.interface";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get(API_ALL_POSTS) as Observable<Post[]>;
  }

  getPostDetails(id: string): Observable<Post> {
    return this.http.get(API_POSTS + id);
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get(API_POSTS + "?user=" + userId) as Observable<Post[]>;
  }

  addPost(post: FormData): Observable<APIResponse> {
    return this.http.post(API_ADD_POST, post);
  }
}
