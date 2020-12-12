
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoodLogComponent } from './mood-log/mood-log.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mood-log',
    component: MoodLogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
