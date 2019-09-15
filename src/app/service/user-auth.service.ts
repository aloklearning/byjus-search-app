import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  //store the user information
  user: User

  constructor(public fireAuth: AngularFireAuth, public router: Router) { 
    //SUBSCRIBE TO THE AUTH AND IF USER LOGGED IN STORE DATA OR NULL
    this.fireAuth.authState.subscribe(user => {
      if(user){
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user))
      }else{
        localStorage.setItem('user', null)
      }
    })
  }

  async singIn(email: string, password: string){
    var result = await this.fireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  async singOut(){
    await this.fireAuth.auth.signOut()
    localStorage.removeItem('user')
    this.router.navigate(['/'], {replaceUrl: true})
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return user !== null
  }
}
