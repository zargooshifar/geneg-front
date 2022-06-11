import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {LandingModule} from '../landing/landing.module';
import {NbAlertModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NbAuthComponent} from '@nebular/auth';
import {SharedComponentsModule} from '../components/shared-components.module';


const routes: Routes = [
  {
    path: '', component: NbAuthComponent,
    children: [
      {path: 'auth', component: LoginComponent},

    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    NbIconModule,
    FormsModule,
    SharedComponentsModule,
  ],
})
export class AuthModule {
}
