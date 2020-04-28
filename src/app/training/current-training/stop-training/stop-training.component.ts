import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.css']
})
export class StopTrainingComponent implements OnInit {
  progress: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { progress: number }) {
  }

  ngOnInit(): void {
    this.progress = this.data.progress;
  }
}
