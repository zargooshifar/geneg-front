import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-combo-view-cell',
  templateUrl: './combo-view-cell.component.html',
  styleUrls: ['./combo-view-cell.component.scss']
})
export class ComboViewCellComponent implements OnInit {
  @Input() value: string;
  @Input() rowData: any;
  @Input() extra: any;
  text: any;
  constructor() {
  }

  ngOnInit(): void {
   this.text = this.extra[this.value];
  }

}
