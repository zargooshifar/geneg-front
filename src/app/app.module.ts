import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NB_TIME_PICKER_CONFIG,
  NbDatepickerModule,
  NbDateService,
  NbDialogModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {CoreModule} from './core/core.module';
import {ThemeModule} from './theme/theme.module';
import {JalaliDateService} from "@zargooshifar/jalali-date-service";
import {WebcamModule} from "ngx-webcam";

// import {JalaliDateService} from "./services/jalali-date-service";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbSelectModule,
    WebcamModule,

  ],
  providers: [
    { provide: NB_TIME_PICKER_CONFIG, useValue: {} },
    { provide: NbDateService, useClass: JalaliDateService }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {

}

