import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval: any;

  constructor() {
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.progress === 100) {
        clearInterval(this.interval);
      } else {
        this.progress += 5;
      }
    }, 1000);
  }
}
