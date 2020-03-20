import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { PostsComponent } from "./components/posts/posts.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { AddPostComponent } from "./components/add-post/add-post.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "posts/add", component: AddPostComponent, canActivate: [AuthGuard] },
  {
    path: "posts/:id",
    component: PostDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
