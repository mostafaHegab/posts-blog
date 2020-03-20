import { Component, OnInit } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import { NgForm } from "@angular/forms";
import { Post } from "src/app/interfaces/post.interface";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.css"]
})
export class AddPostComponent implements OnInit {
  image: File = null;
  adding = false;
  error = "";
  success = false;

  constructor(private postsSer: PostsService) {}

  ngOnInit() {}

  onImageChange(event: Event) {
    this.image = (<HTMLInputElement>event.target).files[0];
  }

  add(form: NgForm) {
    this.adding = true;
    this.error = "";
    this.success = false;
    let formValue: Post = form.value;
    let formData = new FormData();
    formData.append("title", formValue.title);
    formData.append("content", formValue.content);
    formData.append("image", this.image);
    this.postsSer.addPost(formData).subscribe(
      res => {
        this.adding = false;
        this.error = "";
        this.success = true;
      },
      err => {
        this.adding = false;
        this.error = err.message;
        this.success = false;
      }
    );
  }
}
