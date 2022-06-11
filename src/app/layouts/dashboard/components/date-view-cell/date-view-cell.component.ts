import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-view-cell',
  templateUrl: './date-view-cell.component.html',
  styleUrls: ['./date-view-cell.component.scss']
})
export class DateViewCellComponent implements OnInit {
  @Input() value: string;
  @Input() rowData: any;
  date: any;

  constructor() {
  }

  ngOnInit(): void {
    const date = new Date(this.value);
    if (this.value)
      this.date = date.toLocaleDateString('fa-IR');
    else {
      this.date = "";
    }
  }

}
