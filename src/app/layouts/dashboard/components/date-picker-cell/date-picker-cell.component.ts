import {Component, OnInit} from '@angular/core';
import {DefaultEditor} from "../../../components/table/components/cell/cell-editors/default-editor";

@Component({
  selector: 'app-date-picker-cell',
  templateUrl: './date-picker-cell.component.html',
  styleUrls: ['./date-picker-cell.component.scss']
})
export class DatePickerCellComponent extends DefaultEditor implements OnInit {

  ngOnInit(): void {
  }


}
