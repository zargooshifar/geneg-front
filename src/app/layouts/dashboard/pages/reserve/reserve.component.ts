import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {DateConverterService} from "../../../../services/date-converter.service";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  lunches = [];
  BACKEND = BACKEND;

  constructor(private http: HttpClient, public dateService: DateConverterService, private toastr: NbToastrService) {
  }

  ngOnInit(): void {
     this.http.get(BACKEND + 'api/reserves/reserves').subscribe((res:any) => {
       this.lunches = res;
    });
  }

  reserve(id, i) {
    this.http.put(BACKEND + 'api/reserves/reserve', {food_id: id, type: 'add'}).subscribe(res => {
      this.lunches[i].count = res['count'];
      this.toastr.success("آیتم انتخابی اضافه شد.", 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
    });
  }

  unreserve(id, i) {
    this.http.put(BACKEND + 'api/reserves/reserve', {food_id: id, type: 'remove'}).subscribe(res => {
            this.lunches[i].count = res['count'];
      this.toastr.success("آیتم انتخابی حذف شد.", 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
    });
  }
}
