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
  selector: 'app-today-reserves',
  templateUrl: './today-reserves.component.html',
  styleUrls: ['./today-reserves.component.scss']
})
export class TodayReservesComponent implements  OnInit, OnDestroy {

  settings = {
    actions: false,
    columns: {
      user_name: {
        title: 'نام',
        type: 'string',
      },
      count: {
        title: 'تعداد',
        type: 'string',
      },
      food: {
        title: 'غذا',
        type: 'string',
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
    this.dataSource = dataProviderService.todayReservesDataSource;
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



}
