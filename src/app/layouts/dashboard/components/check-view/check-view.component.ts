import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-check-view',
  templateUrl: './check-view.component.html',
  styleUrls: ['./check-view.component.scss']
})
export class CheckViewComponent implements OnInit {
  @Input() value: any;
  constructor() { }

  ngOnInit(): void {
  }

}
