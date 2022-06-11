import {Component, OnInit} from '@angular/core';
import {DefaultEditor} from "../../../components/table/components/cell/cell-editors/default-editor";

@Component({
  selector: 'app-image-select-cell',
  templateUrl: './image-select-cell.component.html',
  styleUrls: ['./image-select-cell.component.scss']
})
export class ImageSelectCellComponent extends DefaultEditor implements OnInit {

  ngOnInit(): void {
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('document', file);
      this.cell.newValue = file;
    }
  }
}
