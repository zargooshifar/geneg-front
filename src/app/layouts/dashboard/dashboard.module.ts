import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';
import {HeaderComponent} from './components/header/header.component';
import {NbLogoutComponent} from '@nebular/auth';
import {SharedComponentsModule} from '../components/shared-components.module';
import {UsersComponent} from './pages/users/users.component';
import {Ng2SmartTableModule} from '../components/table/ng2-smart-table.module';
import {CheckViewComponent} from './components/check-view/check-view.component';
import {DateViewComponent} from './components/date-view/date-view.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {Ng2CompleterModule} from "@akveo/ng2-completer";
import {DatePickerCellComponent} from './components/date-picker-cell/date-picker-cell.component';
import {DateViewCellComponent} from './components/date-view-cell/date-view-cell.component';
import {NotConfirmedComponent} from "./pages/not-confirmed/not-confirmed.component";
import { FoodsComponent } from './pages/foods/foods.component';
import { ImagesComponent } from './pages/images/images.component';
import { ImageCellViewComponent } from './components/image-cell-view/image-cell-view.component';
import { ImageSelectCellComponent } from './components/image-select-cell/image-select-cell.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import {DatePickerFilterComponent} from "./components/date-picker-filter/date-picker-filter.component";
import { PaymentsComponent } from './pages/payments/payments.component';
import { PriceCellViewComponent } from './components/price-cell-view/price-cell-view.component';
import {TodayReservesComponent} from "./pages/today-reserves/today-reserves.component";
import {TagsComponent} from "./pages/tags/tags.component";
import {RadialColorPickerModule} from "../components/color-picker/radial-color-picker.module";
import {CheckinComponent} from "./pages/checkin/checkin.component";
import {DateTimeViewComponent} from "./components/date-time-view/date-time-view.component";
import {UserViewComponent} from "./components/user-view/user-view.component";
import {CreateCheckinDialogComponent} from "./components/create-checkin-dialog/create-checkin-dialog.component";
import {CreatePaymentDialogComponent} from "./components/create-payment-dialog/create-payment-dialog.component";


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'logout', component: NbLogoutComponent},
      {path: 'users', component: UsersComponent},
      {path: 'foods', component: FoodsComponent},
      {path: 'not-confirmed', component: NotConfirmedComponent},
      {path: 'images', component: ImagesComponent},
      {path: 'reserve', component: ReserveComponent},
      {path: 'payments', component: PaymentsComponent},
      {path: 'today-reserves', component: TodayReservesComponent},
      {path: 'tags', component: TagsComponent},
      {path: 'checkin', component: CheckinComponent},

    ],
  },
];


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    UsersComponent,
    CheckViewComponent,
    DateViewComponent,
    DatePickerCellComponent,
    DateViewCellComponent,
    NotConfirmedComponent,
    FoodsComponent,
    ImagesComponent,
    ImageCellViewComponent,
    ImageSelectCellComponent,
    ReserveComponent,
    DatePickerFilterComponent,
    PaymentsComponent,
    PriceCellViewComponent,
    TodayReservesComponent,
    TagsComponent,
    CheckinComponent,
    DateTimeViewComponent,
    UserViewComponent,
    CreateCheckinDialogComponent,
    CreatePaymentDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbSelectModule,
    SharedComponentsModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbToggleModule,
    NbCheckboxModule,
    NbTooltipModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbTagModule,
    Ng2CompleterModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    // BidiModule,
    // WebcamModule,
    RadialColorPickerModule
  ],
})
export class DashboardModule { }
