import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  constructor(public sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

}
