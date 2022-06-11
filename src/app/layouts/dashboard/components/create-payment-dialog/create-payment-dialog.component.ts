import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND} from "../../../../const";
import {NbDialogRef, NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-create-payment-dialog',
  templateUrl: './create-payment-dialog.component.html',
  styleUrls: ['./create-payment-dialog.component.scss']
})
export class CreatePaymentDialogComponent implements OnInit {

  item: any;

  amount = 0;

  constructor(private http: HttpClient, private toastr: NbToastrService, private ref: NbDialogRef<any>) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.http.put(BACKEND + 'api/payments/payment', {user_id: this.item.id, amount: -this.amount}).subscribe(res => {
      this.toastr.success("با موفقیت ثبت شد!");
      this.ref.close();
    });

  }

}
