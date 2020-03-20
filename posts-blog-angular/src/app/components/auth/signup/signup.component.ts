import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signing = false;
  success = false;
  authError = "";
  serverError = "";

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  signup(form: NgForm) {
    this.signing = true;
    this.success = false;
    this.serverError = "";
    this.auth.signup(form.value).subscribe(
      res => {
        this.signing = false;
        this.serverError = "";
        if (res.error) {
          this.success = false;
          this.authError = res.error;
        } else {
          this.authError = "";
          this.success = true;
        }
      },
      err => {
        this.signing = false;
        this.success = false;
        this.authError = "";
        this.serverError = err.message;
      }
    );
  }
}
