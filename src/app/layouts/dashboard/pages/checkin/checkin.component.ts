import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataProviderService} from "../../../../services/data-provider.service";
import {NbMenuService} from "@nebular/theme";
import {Dialogs} from "../../../../services/dialogs.service";
import {HttpClient} from "@angular/common/http";
import {DateViewComponent} from "../../components/date-view/date-view.component";
import {UserService} from "../../../../core/data/user/user.service";
import {PriceCellViewComponent} from "../../components/price-cell-view/price-cell-view.component";
import {CheckViewComponent} from "../../components/check-view/check-view.component";
import {DateTimeViewComponent} from "../../components/date-time-view/date-time-view.component";
import {UserViewComponent} from "../../components/user-view/user-view.component";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements  OnInit, OnDestroy {
  settings = {
     actions: false,
      columns: {
      user: {
        title: 'نام',
       type: 'custom',
        renderComponent: UserViewComponent,
        filter: false,
      },
      created_at: {
        title: 'زمان',
         type: 'custom',
        renderComponent: DateTimeViewComponent,
        filter: false,
      },
      tagged: {
        title: 'تگ',
         type: 'custom',
        renderComponent: CheckViewComponent,
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
    this.dataSource = dataProviderService.checkinDataSource;
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
