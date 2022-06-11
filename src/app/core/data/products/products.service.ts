import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, ProductsData} from "./product";
import {Observable, of as observableOf} from 'rxjs';
import {BACKEND} from "../../../const";


export enum PRODUCTS {
  TALENTX = 'f941032e-646e-409b-a62a-96a408375e48',
  TALENTXPLUS = '3429d947-daf5-4e2a-b6c7-575fe5415e1b',
  DISORDERS = 'e0ff60b9-ddcb-4969-90e7-ac90c60507bb',
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsData {

  private products: Product[] = [{
      id: '3429d947-daf5-4e2a-b6c7-575fe5415e1b',
      name: 'سرویس +TALENTX',
      price: 3700000,
      discount: 5.0,
    },
    {
      id: 'f941032e-646e-409b-a62a-96a408375e48',
      name: 'سرویس TalentX',
      price: 2100000,
      discount: 15.0,
    },
    {
      id: 'e0ff60b9-ddcb-4969-90e7-ac90c60507bb',
      name: 'سرویس اختلالات',
      price: 7500000,
      discount: 18.0,
    }];

  constructor(private http: HttpClient) {
    super();
  }

  getProducts(): Observable<Product[]> {
    return observableOf(this.products);
  }

  updateProducts() {
    this.http.get(BACKEND + 'api/products/list').subscribe((res: any) => {
        this.products = res;
    });
  }

  getProductById(id) {
    return this.products.filter((p) => {
      return p.id === id;
    })[0];
  }


}
