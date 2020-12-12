
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
  // public moodOptions: any[] = [
  //   {mood: "good"},
  //   {mood: "okay"},
  //   {mood: "blah"},
  //   {mood: "terrible"}
  // ];
  

  constructor(private moodService: MoodService) { }

  ngOnInit(): void {
  }
  createMood() {
    //this.date = concatenated string of date
    this.successMsg = '';
    this.errorMsg = '';
    this.moodService.createMood(this.date, this.mood, this.details)
      .subscribe((createdMood: Mood) => {
        this.date= '';
        this.mood = '';
        this.details = '';
        const date = new Date(createdMood.date).toDateString();
        this.successMsg = `Mood created successfully ${date}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg= error.error.message;
      })
  }
  //getDate function (create to get system date, builds date, returns concatenated string)
  //be sure to delete HTML for datePicker
}
