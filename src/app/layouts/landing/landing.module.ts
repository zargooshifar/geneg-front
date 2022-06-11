import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {
  NbActionsModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import {SharedComponentsModule} from '../components/shared-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BuffetComponent} from "./pages/buffet/buffet.component";
import {WebcamModule} from "ngx-webcam";
import {CaptureComponent} from "../dashboard/pages/capture/capture.component";
import {BuffetCartComponent} from "./pages/buffet-cart/buffet-cart.component";


const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      {path: 'buffet', component: BuffetComponent},
      {path: 'capture', component: CaptureComponent},
      {path: 'card', component: BuffetCartComponent},
      {path: '', component: HomeComponent},

    ],
  },
];

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    BuffetComponent,
    CaptureComponent,
    BuffetCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    NbMenuModule,
    NbActionsModule,
    NbContextMenuModule,
    NbSidebarModule,
    NbIconModule,
    SharedComponentsModule,
    NbCardModule,
    NbListModule,
    ReactiveFormsModule,
    FormsModule,
    WebcamModule,
  ],
  exports: [
  ],
})
export class LandingModule {
}
