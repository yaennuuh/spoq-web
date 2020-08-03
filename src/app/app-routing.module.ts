import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'game/:mode/:playlist',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GamePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'playlist/:mode',
    loadChildren: () => import('./pages/playlist/playlist.module').then( m => m.PlaylistPageModule)
  },
  {
    path: 'safari',
    loadChildren: () => import('./pages/safari/safari.module').then( m => m.SafariPageModule)
  },
  {
    path: 'mobileaudio/:mode/:playlist',
    loadChildren: () => import('./pages/mobileaudio/mobileaudio.module').then( m => m.MobileaudioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
