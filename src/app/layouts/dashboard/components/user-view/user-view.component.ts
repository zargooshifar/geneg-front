import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-check-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @Input() value: any;
  constructor() { }

  ngOnInit(): void {
  }

}
