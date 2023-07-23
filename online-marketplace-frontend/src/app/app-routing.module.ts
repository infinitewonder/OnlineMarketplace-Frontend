import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './path/to/login/login.component';
import { GameComponent } from './path/to/game/game.component';
import { LeaderboardComponent } from './path/to/leaderboard/leaderboard.component';
import { StatsComponent } from './path/to/stats/stats.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game', component: GameComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
