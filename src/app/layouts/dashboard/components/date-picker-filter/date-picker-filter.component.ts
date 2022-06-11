import {DefaultFilter} from "../../../components/table/components/filter/filter-types/default-filter";
import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-date-picker-filter',
  templateUrl: './date-picker-filter.component.html',
  styleUrls: ['./date-picker-filter.component.scss']
})
export class DatePickerFilterComponent extends DefaultFilter implements OnInit, OnChanges {

  inputControl = new FormControl();
  date: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.setValue(new Date());
    if (this.query) {
      this.inputControl.setValue(this.query);
    }
    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: string) => {
        if (this.inputControl.value !== "") {
          this.query = this.inputControl.value.toISOString();
        } else {
          this.query = "";
        }
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.inputControl.setValue(this.query);
    }
  }

}
