import {Component, OnDestroy, OnInit} from '@angular/core';
import {DateViewComponent} from "../../components/date-view/date-view.component";
import {DatePickerCellComponent} from "../../components/date-picker-cell/date-picker-cell.component";
import {ComboViewCellComponent} from "../../components/combo-view-cell/combo-view-cell.component";
import {Subscription} from "rxjs";
import {DataProviderService} from "../../../../services/data-provider.service";
import {NbMenuService} from "@nebular/theme";
import {Dialogs} from "../../../../services/dialogs.service";
import {HttpClient} from "@angular/common/http";
import {ImageCellViewComponent} from "../../components/image-cell-view/image-cell-view.component";
import {ImageSelectCellComponent} from "../../components/image-select-cell/image-select-cell.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as https from "https";
import {BACKEND} from "../../../../const";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'اسم عکس',
        type: 'string',
      },
      document: {
        title: 'فایل',
        type: 'custom',
        renderComponent: ImageCellViewComponent,
        editor: {
          type: 'custom',
          component: ImageSelectCellComponent,

        }
      },
    },
  };


  menuItems = [
    {},
  ];
  private contextMenus: Subscription;
  dataSource: any;

  constructor(private dataProviderService: DataProviderService,
              private nbMenuService: NbMenuService,
              private dialogs: Dialogs, private http: HttpClient) {
    this.dataSource = dataProviderService.imagesDataSource;
  }


  ngOnInit(): void {
    this.contextMenus = this.nbMenuService.onItemClick().subscribe(res => {
      if (res['item']['command'])
        res['item']['command'](res['tag']);
    });


  }

  ngOnDestroy(): void {
    this.contextMenus.unsubscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('یا از حذف عکس مطمئن هستید؟')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


}
