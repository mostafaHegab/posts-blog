import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post.interface";
import { PostsService } from "src/app/services/posts.service";
import { API_HOST } from "../../utils/api.util";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loading = true;
  error = "";
  api = API_HOST;
  posts: Post[] = [];
  constructor(private postsSer: PostsService) {}

  ngOnInit() {
    this.postsSer.getAllPosts().subscribe(
      posts => {
        this.loading = false;
        this.posts = posts;
      },
      err => {
        this.loading = false;
        this.error = err.message;
      }
    );
  }
}
