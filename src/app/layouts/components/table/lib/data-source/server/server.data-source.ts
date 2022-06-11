import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LocalDataSource} from '../local/local.data-source';
import {ServerSourceConf} from './server-source.conf';
import {getDeepFromObject} from '../../helpers';

import {map} from 'rxjs/operators';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';

export class ServerDataSource extends LocalDataSource {

  protected conf: ServerSourceConf;

  protected lastRequestCount: number = 0;

  constructor(protected http: HttpClient, conf: ServerSourceConf | {} = {}, private toastr: NbToastrService) {
    super();
    this.conf = new ServerSourceConf(conf);
    if (!this.conf.endPoint) {
      throw new Error('At least endPoint must be specified as a configuration of the server data source.');
    }
  }

  get(id: string) {
    return this.http.get(this.conf.getEndPoint).toPromise();
  }

  prepend(element: any): Promise<any> {

    const data = {
      ...element,
      ...this.conf.addExtraFields
    };
    let dataToSend = data;

    if (this.conf.createAsForm) {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      dataToSend = formData;
    }

    return this.http.put(this.conf.crateEndPoint, dataToSend).toPromise().then(res => {
      super.prepend(element);
      this.toastr.success('رکورد مورد نظر ایجاد شد!', 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});

    });
  }

  remove(element: any): Promise<any> {
    return this.http.delete(this.conf.deleteEndPoint, {params: element}).toPromise().then(res => {
      super.remove(element);
      this.toastr.success('رکورد مورد نظر حذف شد!', 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});
    });
  }

  update(element: any, values: any): Promise<any> {
    this.conf.addExcludeFileds.forEach(item => {
      delete values[item];
    });
    return this.http.post(this.conf.editEndPoint, values).toPromise().then(res => {
      // super.update(element, values);
      this.refresh();
      this.toastr.success('رکورد مورد نظر ویرایش شد!', 'موفق', {position: NbGlobalPhysicalPosition.TOP_RIGHT});

    });
  }


  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    return this.requestElements()
      .pipe(map(res => {
        this.lastRequestCount = this.extractTotalFromResponse(res);
        this.data = this.extractDataFromResponse(res);

        return this.data;
      })).toPromise();
  }

  /**
   * Extracts array of data from server response
   * @param res
   * @returns {any}
   */
  protected extractDataFromResponse(res: any): Array<any> {
    const rawData = res.body;
    const data = !!this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;

    if (data instanceof Array) {
      return data;
    }

    throw new Error(`Data must be an array.
    Please check that data extracted from the server response by the key '${this.conf.dataKey}' exists and is array.`);
  }

  /**
   * Extracts total rows count from the server response
   * Looks for the count in the heders first, then in the response body
   * @param res
   * @returns {any}
   */
  protected extractTotalFromResponse(res: any): number {
    if (res.headers.has(this.conf.totalKey)) {
      return +res.headers.get(this.conf.totalKey);
    } else {
      const rawData = res.body;
      return getDeepFromObject(rawData, this.conf.totalKey, 0);
    }
  }

  protected requestElements(): Observable<any> {
    let httpParams = this.createRequesParams();
    const extra = this.conf.listExtraFields;
    Object.keys(extra).forEach(function (item) {
      httpParams = httpParams.set(item, extra[item]);
    });
    this.conf.addExcludeFileds.forEach(item => {
      httpParams.delete(item);
    });
    return this.http.get(this.conf.endPoint, {params: httpParams, observe: 'response'});
  }

  protected createRequesParams(): HttpParams {
    let httpParams = new HttpParams();

    httpParams = this.addSortRequestParams(httpParams);
    httpParams = this.addFilterRequestParams(httpParams);
    return this.addPagerRequestParams(httpParams);
  }

  protected addSortRequestParams(httpParams: HttpParams): HttpParams {
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        httpParams = httpParams.set(this.conf.orderDirKey, fieldConf.field + ' ' + fieldConf.direction);
      });
    }

    return httpParams;
  }

  protected addFilterRequestParams(httpParams: HttpParams): HttpParams {

    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf: any) => {
        if (fieldConf['search']) {
          httpParams = httpParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), fieldConf['search']);
        }
      });
    }

    return httpParams;
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
      httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page']);
      httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
    }

    return httpParams;
  }

  setAddExtraField(params: any) {
    this.conf.addExtraFields = params;
  }

  setListExtraField(params: any) {
    this.conf.listExtraFields = params;

  }
}
