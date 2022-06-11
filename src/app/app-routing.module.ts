import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TestComponent} from "./layouts/components/test/test.component";
import {CaptureComponent} from "./layouts/dashboard/pages/capture/capture.component";


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/landing/landing.module')
      .then(m => m.LandingModule),
  },
  {
    path: '',
    loadChildren: () => import('./layouts/auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./layouts/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
  },
  {
  path: 'test',
    component: CaptureComponent
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
