import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
}
@Injectable()
export abstract class ProductsData {
  abstract getProducts(): Observable<Product[]>;
  abstract updateProducts();
  abstract getProductById(id);
}
