import {Component} from '@angular/core';

import {DefaultEditor} from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <nb-select [ngClass]="inputClass"
               fullWidth
               [(ngModel)]="cell.newValue"
               [name]="cell.getId()"
               [disabled]="!cell.isEditable()"
               (keydown.enter)="onEdited.emit($event)"
               (keydown.esc)="onStopEditing.emit()"
               [selected]="cell.getValue()">

      <nb-option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value">{{ option.title }}
      </nb-option>
    </nb-select>
  `,
})
export class SelectEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}
