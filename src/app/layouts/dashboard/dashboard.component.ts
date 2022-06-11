import {Component, OnInit} from '@angular/core';
import {NbRoleProvider} from '@nebular/security';
import {NbIconLibraries, NbMenuService, NbSidebarService} from "@nebular/theme";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menuItems: any;

  constructor(private roleProvider: NbRoleProvider,
              private iconLibraries: NbIconLibraries,
              private router: Router, private menuService: NbMenuService,
              private sidebarService: NbSidebarService) {
    this.iconLibraries.registerFontPack('font-aweome', {packClass: 'fa'});
    this.iconLibraries.setDefaultPack('font-aweome');
  }

  ngOnInit(): void {
    this.menuItems = [{
      title: 'خروج از حساب کاربری',
      icon: 'fa-sign-out-alt',
      link: 'logout',
    }];
    this.roleProvider.getRole().subscribe(res => {
      if (res === undefined) {
        this.menuItems = [
          {
            title: 'تایید اکانت',
            link: 'not-confirmed',
            icon: 'fa-exclamation',
          },
          {
          title: 'پروفایل کاربری',
          link: 'profile',
          icon: 'fa-user',

        },
        {
          title: 'خروج از حساب کاربری',
          icon: 'fa-sign-out-alt',
          link: 'logout',
        }

        ];
      } else {
        this.menuItems = [
          {
            title: 'رزرو غذا',
            link: 'reserve',
            icon: 'fa-utensils',
            hidden: !res.includes('user')

          }, {
            title: 'حساب',
            link: 'payments',
            icon: 'fa-dollar',
            hidden: !res.includes('guest')
          }, {
            title: 'تگ ها',
            link: 'tags',
            icon: 'fa-wifi',
            hidden: !res.includes('guest')
          }, {
            title: 'لیست غذاها',
            link: 'foods',
            icon: 'fa-list',
            hidden: !res.includes('operator')

          }, {
            title: 'عکس ها',
            link: 'images',
            icon: 'fa-image',
            hidden: !res.includes('operator')

          }, {
            title: 'رزرو امروز',
            link: 'today-reserves',
            icon: 'fa-calendar-day',
            hidden: !res.includes('operator')

          },
          {
            title: 'ورود خروج',
            link: 'checkin',
            icon: 'fa-door',
            hidden: !res.includes('operator')
          }, {
            title: 'همکاران',
            link: 'users',
            icon: 'fa-users',
            hidden: !res.includes('user')
          },
          {
            title: 'پروفایل کاربری',
            link: 'profile',
            icon: 'fa-user',
          },
          {
            title: 'خروج از حساب کاربری',
            icon: 'fa-sign-out-alt',
            link: 'logout',
          },
        ];
      }

      const default_page = this.menuItems.filter(item => item.hidden === false)[0].link;

      this.router.navigate(['/dashboard/' + default_page]);
      // this.router.navigate(['/dashboard/capture']);
    });

     this.menuService.onItemClick().subscribe(() => {
      // if (window.innerWidth < 1200 && window.innerWidth >= 576) {
      //   this.sidebarService.compact('menu-sidebar');
      // } else if (window.innerWidth < 576) {
        this.sidebarService.collapse('menu-sidebar');
      // }
    });
  }

}
