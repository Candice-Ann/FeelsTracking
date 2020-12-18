
import { Component, OnInit } from '@angular/core';
import { Mood } from 'src/app/mood';
import { MoodService } from 'src/app/mood.service';
import { mergeMap } from 'rxjs/operators'; 

@Component({
  selector: 'app-mood-log',
  templateUrl: './mood-log.component.html',
  styleUrls: ['./mood-log.component.css']
})
export class MoodLogComponent implements OnInit {

  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public moods: Mood[] = [];
  public columns = ['date', 'mood', 'details', 'kill'];

  constructor(private moodService: MoodService) { }
//gets mood and passes mood back
  ngOnInit() {
    this.moodService.getMood()
      .subscribe((moods: Mood[]) => {
        this.moods = moods;
        this.loading = false;
      },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
  }

  cancelMood(id: string) {
    this.moodService.cancelMood(id)
    .pipe(
      mergeMap(() => this.moodService.getMood())
    )
    .subscribe((moods: Mood[]) => {
      this.moods = moods;
      this. successMsg = 'Successfully killed your mood'
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }
}
