import {Injectable} from '@angular/core';
import {AppInjector} from "../app.component";
import {NbDialogService} from "@nebular/theme";
import {DataProviderService} from "./data-provider.service";
import {CreateCheckinDialogComponent} from "../layouts/dashboard/components/create-checkin-dialog/create-checkin-dialog.component";
import {CreatePaymentDialogComponent} from "../layouts/dashboard/components/create-payment-dialog/create-payment-dialog.component";

@Injectable({
  providedIn: 'root',
})
export class Dialogs {


  openCreateCheckinDialog(item: any) {
    const dialogService = AppInjector.get(NbDialogService);
    const samples = AppInjector.get(DataProviderService);
    dialogService.open(CreateCheckinDialogComponent, {context: {item: item}})
      .onClose.subscribe(isSuccess => {
      if (isSuccess) {
        samples.usersDataSource.refresh();
      }
    });
  }


   openCreatePaymentDialog(item: any) {
    const dialogService = AppInjector.get(NbDialogService);
    const samples = AppInjector.get(DataProviderService);
    dialogService.open(CreatePaymentDialogComponent, {context: {item: item}})
      .onClose.subscribe(isSuccess => {
      if (isSuccess) {
        samples.usersDataSource.refresh();
      }
    });
  }

  //
  // openSampleDetailDialog(item: any) {
  //   const dialogService = AppInjector.get(NbDialogService);
  //   const samples = AppInjector.get(DataProviderService);
  //   dialogService.open(SampleDetailsDialogComponent, {context: {item: item}})
  //     .onClose.subscribe(isSuccess => {
  //     if (isSuccess) {
  //       samples.samplesDataSource.refresh();
  //     }
  //   });
  // }
  //
  // openEditSampleDetailDialog(item: any) {
  //   const dialogService = AppInjector.get(NbDialogService);
  //   const samples = AppInjector.get(DataProviderService);
  //   dialogService.open(SampleDetailsEditDialogComponent, {context: {item: item}})
  //     .onClose.subscribe(isSuccess => {
  //     if (isSuccess) {
  //       samples.samplesDataSource.refresh();
  //     }
  //   });
  // }
  // openUserDetailsDialog(item: any) {
  //   const dialogService = AppInjector.get(NbDialogService);
  //   dialogService.open(UserDetailsDialogComponent, {context: {item: item}})
  //     .onClose.subscribe(res => {
  //
  //   });
  // }
}
