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
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements  OnInit, OnDestroy {

  balance = 0;
  settings = {
    actions: false,
    columns: {
      description: {
        title: 'توضیح',
        type: 'string',
      },
      amount: {
        title: 'مبلغ',
        type: 'custom',
        renderComponent: PriceCellViewComponent,
      },
      created_at: {
        title: 'تاریخ',
        type: 'custom',
        renderComponent: DateViewComponent,
      }
    },
  };


  menuItems = [
    {},
  ];
  private contextMenus: Subscription;
  dataSource: any;

  constructor(private dataProviderService: DataProviderService,
              private nbMenuService: NbMenuService,
              private dialogs: Dialogs, private http: HttpClient, private userService: UserService) {
    this.dataSource = dataProviderService.paymentsDataSource;
  }


  ngOnInit(): void {
    this.contextMenus = this.nbMenuService.onItemClick().subscribe(res => {
      if (res['item']['command'])
        res['item']['command'](res['tag']);
    });

      this.userService.getUserProfile().then((res: any) => {
      this.balance = res['balance'];
    });

  }

  ngOnDestroy(): void {
    this.contextMenus.unsubscribe();
  }



}
