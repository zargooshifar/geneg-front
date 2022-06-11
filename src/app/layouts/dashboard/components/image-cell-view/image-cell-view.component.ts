import {Component, Input, OnInit} from '@angular/core';
import {BACKEND} from "../../../../const";

@Component({
  selector: 'app-image-cell-view',
  templateUrl: './image-cell-view.component.html',
  styleUrls: ['./image-cell-view.component.scss']
})
export class ImageCellViewComponent implements OnInit {
  @Input() rowData: any;
  BACKEND = BACKEND;
  constructor() { }

  ngOnInit(): void {
  }

}
