import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  skills: string
  experience: string
  location: string
  companyname: string

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/'], {replaceUrl: true})
  }

  search(){

  }

}
