import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mood } from './mood';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getMood(): Observable<Mood[]> {
    return this.http.get<Mood[]>(`${this.BASE_URL}/feels`)
  }
  createMood(date: string, mood: string, details: string): Observable<Mood> {
    return this.http.post<Mood>(`${this.BASE_URL}/feels`,
    { date, mood, details });
  }
  cancelMood(id: string): Observable<any> {
      return this.http.delete(`${this.BASE_URL}/feels/${id}`);
    }
}




 

  

