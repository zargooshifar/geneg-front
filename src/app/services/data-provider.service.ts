import {Injectable} from '@angular/core';
import {ServerDataSource} from '../layouts/components/table/lib/data-source/server/server.data-source';
import {HttpClient} from '@angular/common/http';
import {NbToastrService} from '@nebular/theme';
import {BACKEND} from "../const";

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {



  usersDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/admin/users',
    getEndPoint: BACKEND + 'api/admin/user',
    editEndPoint: BACKEND + 'api/admin/user',
    deleteEndPoint: BACKEND + 'api/admin/user',
    crateEndPoint: BACKEND + 'api/admin/user',
    addExcludeFileds: ['payments', 'balance', 'created_at', 'updated_at', 'deleted_at'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);

  foodsDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/foods/foods',
    getEndPoint: BACKEND + 'api/foods/food',
    editEndPoint: BACKEND + 'api/foods/food',
    deleteEndPoint: BACKEND + 'api/foods/food',
    crateEndPoint: BACKEND + 'api/foods/food',
    addExcludeFileds: ['created_at', 'updated_at', 'deleted_at', 'image'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);

  imagesDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/images/images',
    getEndPoint: BACKEND + 'api/images/image',
    editEndPoint: BACKEND + 'api/images/image',
    deleteEndPoint: BACKEND + 'api/images/image',
    crateEndPoint: BACKEND + 'api/images/upload',
    createAsForm: true,
    addExcludeFileds: ['created_at', 'updated_at', 'deleted_at'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);

  paymentsDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/payments/payments',
    getEndPoint: BACKEND + 'api/payments/payment',
    editEndPoint: BACKEND + 'api/payments/payment',
    deleteEndPoint: BACKEND + 'api/payments/payment',
    crateEndPoint: BACKEND + 'api/payments/payment',
    addExcludeFileds: ['created_at', 'updated_at', 'deleted_at'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);


  tagsDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/tags/tags',
    editEndPoint: BACKEND + 'api/tags/tag',
    deleteEndPoint: BACKEND + 'api/tags/tag',
    crateEndPoint: BACKEND + 'api/tags/tag',
    addExcludeFileds: ['created_at', 'updated_at', 'deleted_at'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);

   checkinDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/checkin/checkins',
    editEndPoint: BACKEND + 'api/checkin/checkin',
    deleteEndPoint: BACKEND + 'api/checkin/checkin',
    crateEndPoint: BACKEND + 'api/checkin/checkin',
    addExcludeFileds: ['created_at', 'updated_at', 'deleted_at'],
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);

  todayReservesDataSource: ServerDataSource = new ServerDataSource(this.http, {
    endPoint: BACKEND + 'api/reserves/today',
    totalKey: 'count',
    dataKey: 'results',
  }, this.toastr);


  constructor(private http: HttpClient, private toastr: NbToastrService) {
  }
}
