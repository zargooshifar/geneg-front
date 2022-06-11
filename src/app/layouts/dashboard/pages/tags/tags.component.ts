import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataProviderService} from "../../../../services/data-provider.service";
import {NbMenuService} from "@nebular/theme";
import {Dialogs} from "../../../../services/dialogs.service";
import {HttpClient} from "@angular/common/http";
import {DateViewComponent} from "../../components/date-view/date-view.component";
import {UserService} from "../../../../core/data/user/user.service";
import {PriceCellViewComponent} from "../../components/price-cell-view/price-cell-view.component";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements  OnInit, OnDestroy {
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
        title: 'نام دلخواه',
        type: 'string',
        filter: false,
      },
      tag_id: {
        title: 'کد تگ',
        type: 'string',
        filter: false,
      }
    },
  };


  menuItems = [
    {},
  ];
  private contextMenus: Subscription;
  dataSource: any;

  constructor(private dataProviderService: DataProviderService,
              private nbMenuService: NbMenuService) {
    this.dataSource = dataProviderService.tagsDataSource;
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
