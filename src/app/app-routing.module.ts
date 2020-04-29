import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {
    path: '',
    loadChildren: () => import('./auth/auth.module')
      .then(module => module.AuthModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module')
      .then(module => module.TrainingModule),
    canLoad: [AuthGuard]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
