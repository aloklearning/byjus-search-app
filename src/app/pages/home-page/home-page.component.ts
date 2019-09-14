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

  /* UPDATES DATA, HERE THE SEARCHED DATA IS INJECTED TO THE ARRAY OF OBJECT VARIABLE DATA */
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
    // IF ALL ARE EMPTY FIELDS
    if(!this.skills && !this.experience && !this.location && !this.companyname){
      this.showAllData()
    }//IF ALL ARE FILLED
    else if(this.skills && this.experience && this.location && this.companyname){
      this.searchAllFilter()
    }
    // IF ANY ONE NON-EMPTY FIELD
    else if(this.skills || this.experience || this.location || this.companyname){
      // CHECK FOR SPECIFIC SINGLE FIELD: SKILLS -> EXPERIENCE -> LOCATION -> COMPANY
      if(this.skills && !this.experience && !this.location && !this.companyname) this.singleDataFiler("skills", this.skills)
      else if(!this.skills && this.experience && !this.location && !this.companyname) this.singleDataFiler("experience", this.experience)
      else if(!this.skills && !this.experience && this.location && !this.companyname) this.singleDataFiler("location", this.location)
      else if(!this.skills && !this.experience && !this.location && this.companyname) this.singleDataFiler("company", this.companyname)
    }
  }

  /* SEARCH FOR ALL FILLED DATA*/
  searchAllFilter(){
    this.loading = true
    this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').subscribe(data => {
      let filtered = [] //for populating filtered data
      for(let job of cast(data['data'], Job)){
        // IF ALL FIELDS ARE THERE IN THE API
        if(job.skills && job.experience && job.location && job.companyname){
          //SEARCHING FOR THE TERM OPERATION 
          if(job.skills.search(new RegExp(this.skills, "i")) != -1
          && job.experience.search(new RegExp(this.experience, "i")) != -1
          && job.location.search(new RegExp(this.location, "i")) != -1
          && job.companyname.search(new RegExp(this.companyname, "i")) != -1){ filtered.push(job) }
        }
      }
      this.postFilter(filtered)
    })
  }

  /* SINGLE DATA CHECK */
  singleDataFiler(item, text){
    var log
    this.loading = true
    this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').subscribe(data => {
      let filtered = [] //for populating filtered data
      for(let job of cast(data['data'], Job)){
        if(item == "skills") log = job.skills
        else if(item == "experience") log = job.experience
        else if (item == "location") log = job.location
        else log = job.companyname

        if(log){
          //SEARCHING FOR THE TERM OPERATION
          if(log.search(new RegExp(text, "i")) != -1) filtered.push(job)
        }
      }
      this.postFilter(filtered)
    })
  }

  /* POST FILTER OPERATION */
  postFilter(filtered){
    //FINALLY UPDATING THE DATA 
    if(filtered.length == 0){
      this.totJobs = 0
      this.updateData([])
      this.message = "No jobs found for the specified search"
      this.loading = false
    }else{
      this.totJobs = filtered.length
      this.updateData(filtered)
      this.message = ""
      this.loading = false
    }
  }
}
