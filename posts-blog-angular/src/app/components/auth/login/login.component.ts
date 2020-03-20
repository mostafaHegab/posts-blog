import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  signing = false;
  authError = "";
  serverError = "";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  loginSuccess(user: User) {
    this.auth.setUser(user);
    this.router.navigate(["/"]);
  }

  login(form: NgForm) {
    this.signing = true;
    this.serverError = "";
    this.authError = "";
    this.auth.login(form.value).subscribe(
      res => {
        this.signing = false;
        this.serverError = "";
        if (res.error) {
          this.authError = res.error;
        } else {
          this.authError = "";
          this.loginSuccess(res);
        }
      },
      err => {
        this.signing = false;
        this.authError = "";
        this.serverError = err.error.error;
      }
    );
  }
}
