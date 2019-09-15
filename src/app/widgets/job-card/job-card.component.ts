import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/model/model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  @Input() job: Job
  
  constructor() { }

  ngOnInit() {
  }

}
