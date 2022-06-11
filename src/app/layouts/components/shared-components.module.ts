import {ThemeChangerComponent} from './theme-changer/theme-changer.component';
import {NgModule} from '@angular/core';
import {
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbToggleModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Ng2SmartTableModule} from './table/ng2-smart-table.module';
import {NumbersCommaPipe} from "../../core/pipes/numbersComma";
import {NumbersEngPipe} from "../../core/pipes/numbersEng";
import {TestComponent} from './test/test.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ThemeChangerComponent,
    NumbersCommaPipe,
    NumbersEngPipe,
    TestComponent,
  ],

    imports: [
        CommonModule,
        NbSelectModule,
        NbCheckboxModule,
        NbToggleModule,
        NbIconModule,
        NbCardModule,
        NbTreeGridModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        Ng2SmartTableModule,
        NbDatepickerModule,
        NbInputModule,
        NbLayoutModule,
        FormsModule,
    ],
  exports: [
    ThemeChangerComponent,
    NumbersCommaPipe,
    NumbersEngPipe,
  ],
})

export class SharedComponentsModule {
}
