import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-price-cell-view',
  templateUrl: './price-cell-view.component.html',
  styleUrls: ['./price-cell-view.component.scss']
})
export class PriceCellViewComponent implements OnInit {
  @Input() value: string;
  @Input() rowData: any;
  intValue: number;

  constructor() {
  }

  ngOnInit(): void {
    this.intValue = parseInt(this.value, 10);
  }

}
