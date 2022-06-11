import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {UserData} from '../../../../core/data/user/user';

import {LayoutService} from '../../../../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  title = 'هومن ژن';


  constructor(public sidebarService: NbSidebarService,
              public userService: UserData,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    this.layoutService.changeLayoutSize();

    return false;
  }


}
