import {Component, OnDestroy} from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {

  constructor(public auth: NbAuthService, private router: Router) {

   auth.isAuthenticatedOrRefresh().subscribe(res => {
      if (res) {
        router.navigate(['/dashboard']);
      } else {
        router.navigate(['/auth']);
      }
    });
  }

  ngOnDestroy(): void {
  }

}
