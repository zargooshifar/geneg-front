import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuService} from '@nebular/theme';
import {Subscription} from "rxjs";
import {DataProviderService} from "../../../../services/data-provider.service";
import {Dialogs} from "../../../../services/dialogs.service";
import {HttpClient} from "@angular/common/http";
import {PriceCellViewComponent} from "../../components/price-cell-view/price-cell-view.component";
import {NbRoleProvider} from "@nebular/security";
import {ComboViewCellComponent} from "../../components/combo-view-cell/combo-view-cell.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {

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
      first_name: {
        title: 'نام',
        type: 'string',
      },
      last_name: {
        title: 'نام خانوادگی',
        type: 'string',
      },
      username: {
        title: 'شماره تماس',
        type: 'string',
      },
      balance: {
        title: 'حساب',
        type: 'custom',
        editable: false,
        renderComponent: PriceCellViewComponent
      },
      role: {
        title: 'دسترسی',
        type: 'custom',
        renderComponent: ComboViewCellComponent,
          extra: {'user': 'کاربر', 'operator': 'اپراتور' , 'admin': 'ادمین', 'guest': 'میهمان'},
        editor: {
          type: 'list',
          config: {
            list: [
              {title: 'میهمان', value: 'guest'},
              {title: 'کاربر', value: 'user'},
              {title: 'اپراتور', value: 'operator'},
              {title: 'ادمین', value: 'admin'},
            ],
          },
        },

      }
      // role: {
      //   title: 'دسترسی',
      //   // type: 'list',
      //   type: 'custom',
      //   renderComponent: ComboViewCellComponent,
      //   extra: {'user': 'کاربر', 'admin': 'ادمین', 'operator': 'اپراتور'},
      //   editor: {
      //     type: 'list',
      //     config: {
      //       list: [
      //         {title: 'کاربر', value: 'user'},
      //         {title: 'ادمین', value: 'admin'},
      //         {title: 'اپراتور', value: 'operator'},
      //       ],
      //     },
      //   },
      //
      // },
    },
  };


  menuItems = [
    {
        title: 'ثبت ورود',
        command: this.dialogs.openCreateCheckinDialog,
        hidden: false
      },
    {
        title: 'ثبت پرداختی',
        command: this.dialogs.openCreatePaymentDialog,
        hidden: false
      },
  ];
  private contextMenus: Subscription;
  dataSource: any;

  constructor(private dataProviderService: DataProviderService,
              private nbMenuService: NbMenuService,
              private dialogs: Dialogs, private http: HttpClient, private roleProvider: NbRoleProvider) {

    this.dataSource = dataProviderService.usersDataSource;

    this.roleProvider.getRole().subscribe(res => {
      if (!res.includes('admin')) {
        delete this.settings.columns.role;
        this.settings['actions'] = false;
        this.settings = Object.assign({}, this.settings);

        this.menuItems[0].hidden = true;


      }
      if (!res.includes('operator')) {
        delete this.settings.columns.balance;
        this.settings = Object.assign({}, this.settings);
        this.menuItems[1].hidden = true;


      }



    });
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
    if (window.confirm('یا از حذف کاربر مطمئن هستید؟')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


}
