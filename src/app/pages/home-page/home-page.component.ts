import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { cast, Job } from 'src/app/model/model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  jobs: Job[]
  totJobs: any
  skills: string
  message: string
  experience: string
  location: string
  page: number = 1
  loading: boolean = false
  companyname: string
  data: {jobs: Job[]}[] = [] //this is main object which will store the searched/all data

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.showAllData()
  }

  logout(){
    this.router.navigate(['/'], {replaceUrl: true})
  }

  /* SHOWS ALL DATA FROM THE API RESPONSE */
  showAllData(){
    this.loading = true
    this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').subscribe(data => {
      this.totJobs = data['len']
      this.updateData(cast(data['data'], Job))
      this.loading = false
    })
  }

  /* UPDATES DATA, HERE THE SEARCHED DATA IS INJECTED TO THE ARRAY OF OBJECT VARIABLE DATA*/
  updateData(jobs: Job[]){
    this.jobs = jobs
    this.data = []
    for(let job of this.jobs){
      this.data.push({jobs: [job]})
    }
  }

  /* SEARCH OPERATION HAPPENS HERE ON BUTTON CLICK */
  search(){
    this.message = ""
    
  }

}
