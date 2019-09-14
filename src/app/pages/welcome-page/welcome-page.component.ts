import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  message: string
  email: string = ""
  password: string = ""
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    if(this.email && this.password)
      this.router.navigate(['/home'], {replaceUrl: true})
    else
      window.alert('All fields are mandatory')
  }

}
