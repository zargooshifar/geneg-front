import { NgModule } from '@angular/core';
import { ColorPreviewComponent } from './components/color-preview/color-preview.component';
import { RadialColorPickerComponent } from './components/radial-color-picker/radial-color-picker.component';
import { RotatableDirective } from './directives/rotatable.directive';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    RotatableDirective,
    ColorPreviewComponent,
    RadialColorPickerComponent
  ],
  exports: [
    RotatableDirective,
    RadialColorPickerComponent
  ]
})
export class RadialColorPickerModule { }
