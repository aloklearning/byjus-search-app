import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { cast, Job } from 'src/app/model/model';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from 'src/app/service/user-auth.service';

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

  constructor(
    private router: Router, 
    private http: HttpClient,
    private auth: UserAuthService) { }

  ngOnInit() {
    this.showAllData()
  }

  signOut(){
    this.auth.singOut();
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

  /* UPDATES DATA, HERE THE SEARCHED/ALL DATA IS INJECTED TO THE ARRAY OF OBJECT VARIABLE DATA */
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
    }//IF ALL ARE FILLED FIELDS
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
      //CHECK FOR TWO NON-EMPTY FIELDS: SKILLS & EXPERIENCE -> SKILLS & LOCATION -> SKILLS & COMPANY
      else if(this.skills && this.experience && !this.location && !this.companyname){
        this.doubleDataFilter("skills", "experience", this.skills, this.experience)
      }else if(this.skills && !this.experience && this.location && !this.companyname){
        this.doubleDataFilter("skills", "location", this.skills, this.location)
      }else if(this.skills && !this.experience && !this.location && this.companyname){
        this.doubleDataFilter("skills", "company", this.skills, this.companyname)
      }// EXPERIENCE & LOCATION -> EXPERIENCE & COMPANY
      else if(!this.skills && this.experience && this.location && !this.companyname){
        this.doubleDataFilter("experience", "location", this.experience, this.location)
      }else if(!this.skills && this.experience && !this.location && this.companyname){
        this.doubleDataFilter("experience", "company", this.skills, this.companyname)
      }// LOCATION & COMPANY
      else if(!this.skills && !this.experience && this.location && this.companyname){
        this.doubleDataFilter("location", "company", this.location, this.companyname)
      }/* FOR ANY THREE NON-EMPTY FIELDS: SKILLS & EXPERIENCE & LOCATION -> SKILLS & EXPERIENCE & COMPANY
       -> SKILLS & LOCATION & COMPANY */
       else if(this.skills && this.experience && this.location && !this.companyname){
          this.tripleDataFilter("skills", "experience", "location", this.skills, this.experience, this.location)
       }else if(this.skills && !this.experience && this.location && this.companyname){
          this.tripleDataFilter("skills", "location", "company", this.skills, this.location, this.companyname)
       }else if(this.skills && this.experience && !this.location && this.companyname){
          this.tripleDataFilter("skills", "experience", "company", this.skills, this.experience, this.companyname)
       }// EXPERIENCE & LOCATION & COMPANY
       else if(!this.skills && this.experience && this.location && this.companyname){
          this.tripleDataFilter("experience", "location", "company", this.experience, this.location, this.companyname)
       }
    }
  }

  /* SEARCH FOR ALL FILLED FIELD DATA */
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

  /* SINGLE FIELD DATA CHECK */
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

  /* DOUBLE FIELDs DATA CHECK */
  doubleDataFilter(item1, item2, text1, text2){
    var log1, log2
    this.loading = true
    this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').subscribe(data => {
      let filtered = [] //for populating filtered data
      for(let job of cast(data['data'], Job)){
        if(item1 == "skills" && item2 == "experience"){
          log1 = job.skills; 
          log2 = job.experience
        }else if(item1 == "skills" && item2 == "location"){
          log1 = job.skills; 
          log2 = job.location
        }else if(item1 == "skills" && item2 == "company"){
          log1 = job.skills; 
          log2 = job.companyname
        }else if(item1 == "experience" && item2 == "location"){
          log1 = job.experience; 
          log2 = job.location
        }else if(item1 == "experience" && item2 == "company"){
          log1 = job.experience; 
          log2 = job.companyname
        }else{
          log1 = job.location; 
          log2 = job.companyname
        }

        if(log1 && log2){
          //SEARCHING FOR THE TERM OPERATION
          if(log1.search(new RegExp(text1, "i")) != -1 && log2.search(new RegExp(text2, "i")) != -1) 
            filtered.push(job)
        }
      }
      this.postFilter(filtered)
    })
  }

  /* TRIPLE FIELDs DATA CHECK */
  tripleDataFilter(item1, item2, item3, text1, text2, text3){
    var log1, log2, log3
    this.loading = true
    this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').subscribe(data => {
      let filtered = [] //for populating filtered data
      for(let job of cast(data['data'], Job)){
        if(item1 == "skills" && item2 == "experience" && item3 == "location"){
          log1 = job.skills; 
          log2 = job.experience
          log3 = job.location
        }else if(item1 == "skills" && item2 == "location" && item3 == "company"){
          log1 = job.skills; 
          log2 = job.location
          log3 = job.companyname
        }else if(item1 == "skills" && item2 == "experience" && item3 == "company"){
          log1 = job.skills; 
          log2 = job.experience
          log3 = job.companyname
        }else{
          log1 = job.experience; 
          log2 = job.location
          log3 = job.companyname
        }

        if(log1 && log2 && log3){
          //SEARCHING FOR THE TERM OPERATION
          if(log1.search(new RegExp(text1, "i")) != -1 
          && log2.search(new RegExp(text2, "i")) != -1
          && log3.search(new RegExp(text3, "i")) != -1) { filtered.push(job) }
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
      this.message = "No jobs found for this specified search. Please try again"
      this.loading = false
    }else{
      this.totJobs = filtered.length
      this.updateData(filtered)
      this.message = ""
      this.loading = false
    }
  }
}
