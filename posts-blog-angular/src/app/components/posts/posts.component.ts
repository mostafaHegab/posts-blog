import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post.interface";
import { PostsService } from "src/app/services/posts.service";
import { ActivatedRoute } from "@angular/router";
import { API_HOST } from "src/app/utils/api.util";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  gettingPosts = true;
  error = "";
  api = API_HOST;
  posts: Post[] = [];
  userParam: string = null;

  constructor(
    private postsSer: PostsService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.userParam = params.get("user") || this.auth.getUser().userId;
      this.getUserPosts();
    });
  }

  getUserPosts() {
    this.posts = [];
    this.gettingPosts = true;
    this.postsSer.getUserPosts(this.userParam).subscribe(
      posts => {
        this.error = null
        this.gettingPosts = false;
        this.posts = posts;
      },
      err => {
        this.gettingPosts = false;
        this.error = err.message;
        this.posts = []
      }
    );
  }
}
