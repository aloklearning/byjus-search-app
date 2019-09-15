import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  message: string
  email: string = ""
  password: string = ""
  isError: boolean = false
  
  constructor(private router: Router, private auth: UserAuthService) { }

  ngOnInit() {
    //LOGGED IN OR NOT
    if(this.auth.isLoggedIn)
      this.router.navigate(['/home'], {replaceUrl: true})
  }

  signIn(){
    this.message = ""
    if(this.email && this.password){
      this.isError = false
      this.message = "Signing in please wait..."
      this.auth.singIn(this.email, this.password).then(() => {
        this.message = ""
        this.router.navigate(['/home'], {replaceUrl: true})
      }).catch(error => {
        this.isError = true
        this.message = error.message
      })
    }else
      window.alert('All fields are mandatory')
  }

}
