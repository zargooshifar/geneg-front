import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-time-view',
  templateUrl: './date-time-view.component.html',
  styleUrls: ['./date-time-view.component.scss']
})
export class DateTimeViewComponent implements OnInit {

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
