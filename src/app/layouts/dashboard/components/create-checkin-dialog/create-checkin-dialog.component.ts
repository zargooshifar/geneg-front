import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {NbDialogRef, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-create-checkin-dialog',
  templateUrl: './create-checkin-dialog.component.html',
  styleUrls: ['./create-checkin-dialog.component.scss']
})
export class CreateCheckinDialogComponent implements OnInit {

  item: any;


  constructor(private http: HttpClient, private toastr: NbToastrService, private ref: NbDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.http.put(BACKEND + 'api/checkin/checkin', {user_id: this.item.id}).subscribe(res => {
      this.toastr.success("با موفقیت ثبت شد!");
      this.ref.close();
    })

  }

}
