import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post.interface";
import { PostsService } from "src/app/services/posts.service";
import { ActivatedRoute } from "@angular/router";
import { API_HOST } from "../../utils/api.util";

@Component({
  selector: "app-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  id = "";
  postData: Post = null;
  gettingData = true;
  error = null;

  constructor(private postsSer: PostsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.postsSer.getPostDetails(this.id).subscribe(
      data => {
        this.gettingData = false;
        data.image = API_HOST + data.image;
        this.postData = data;
      },
      err => {
        this.gettingData = false;
        this.error = err.message;
      }
    );
  }
}
