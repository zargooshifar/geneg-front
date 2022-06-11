import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html',
  styleUrls: ['./date-view.component.scss']
})
export class DateViewComponent implements OnInit {

  @Input() value;
  date: any;
  time: any;
  constructor() { }

  ngOnInit(): void {
    this.date = new Date(this.value).toLocaleDateString('fa-IR');
    const data = new Date(this.value);
    this.time = data.getHours() + ':' +  data.getMinutes();
  }

}
