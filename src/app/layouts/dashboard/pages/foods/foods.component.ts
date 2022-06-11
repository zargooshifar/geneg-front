import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComboViewCellComponent} from "../../components/combo-view-cell/combo-view-cell.component";
import {Subscription} from "rxjs";
import {DataProviderService} from "../../../../services/data-provider.service";
import {NbMenuService} from "@nebular/theme";
import {Dialogs} from "../../../../services/dialogs.service";
import {HttpClient} from "@angular/common/http";
import {DatePickerCellComponent} from "../../components/date-picker-cell/date-picker-cell.component";
import {DateViewComponent} from "../../components/date-view/date-view.component";
import {settings} from "cluster";
import {BACKEND} from "../../../../const";
import {DatePickerFilterComponent} from "../../components/date-picker-filter/date-picker-filter.component";
import {PriceCellViewComponent} from "../../components/price-cell-view/price-cell-view.component";

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit, OnDestroy {

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
        title: 'نام غذا',
        type: 'string',
      },
      price: {
        title: 'قیمت',
        type: 'custom',
        renderComponent: PriceCellViewComponent,
        filter: false,
        editor: {
          type: 'number'
        }
      },
      expire: {
        title: 'انقضا',
        type: 'custom',
        renderComponent: DateViewComponent,
        editor: {
          type: 'custom',
          component: DatePickerCellComponent,
        },
        filter: {
          type: 'custom',
          component: DatePickerFilterComponent,
        },
      },
      type: {
        title: 'نوع',
        // type: 'list',
        type: 'custom',
        renderComponent: ComboViewCellComponent,
        extra: {'buffet': 'بوفه', 'lunch': 'نهار'},
        editor: {
          type: 'list',
          config: {
            list: [
              {title: 'بوفه', value: 'buffet'},
              {title: 'نهار', value: 'lunch'},
            ],
          },
        },
        filter: {
          type: 'list',
          config: {
            list: [
              {title: 'بوفه', value: 'buffet'},
              {title: 'نهار', value: 'lunch'},
            ],
          },
        },

      },
      image_id: {
        title: 'عکس',
        // type: 'list',
        type: 'custom',
        renderComponent: ComboViewCellComponent,
        filter: false,
        extra: {},
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },

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
    this.http.get(BACKEND + 'api/images/images').subscribe((res: any) => {
      const extra = {};
      const list = [];
      res['results'].forEach(item => {

        extra[item.id] = item.name;
        list.push({value: item.id, title: item.name});
      });
      this.settings.columns.image_id.extra = extra;
      this.settings.columns.image_id.editor.config.list = list;
      this.settings = Object.assign({}, this.settings);
    });
    this.dataSource = dataProviderService.foodsDataSource;
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
    if (window.confirm('یا از حذف غذا مطمئن هستید؟')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


}
