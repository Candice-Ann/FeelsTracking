
import { Component, OnInit } from '@angular/core';
import { MoodService } from 'src/app/mood.service';
import { Mood } from 'src/app/mood';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

  public successMsg: string = '';
  public errorMsg: string = '';
  public date: string = '';
  public mood: string = '';
  public details: string = '';

  constructor(private moodService: MoodService) { }

  ngOnInit(): void {
  }
  createMood() {
    this.date = Date.now().toString();
    this.successMsg = '';
    this.errorMsg = '';
    this.moodService.createMood(this.date, this.mood, this.details)
      .subscribe((createdMood: Mood) => {
        this.successMsg = `Your mood has been saved!`;
        this.date= '';
        this.mood = '';
        this.details = '';
      },
      (error: ErrorEvent) => {
        this.errorMsg= error.error.message;
      })
  }
  //getDate function (create to get system date, builds date, returns concatenated string)
  //be sure to delete HTML for datePicker
}
