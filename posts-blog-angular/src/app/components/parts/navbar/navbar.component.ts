import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isUser = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getUserObserver().subscribe(isUser => {
      console.log("state changed", isUser);
      this.isUser = isUser;
    });
  }

  logout() {
    if (this.auth.logout()) {
      this.router.navigate(["/login"]);
    }
  }
}
