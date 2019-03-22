import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  paymentData: PaymentDetail;
  readonly baseURL = 'http://localhost:49059/api';
  paymentList: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
    return this.http.post(this.baseURL + '/PaymentDetail', this.paymentData);
  }
  putPaymentDetail() {
    return this.http.put(this.baseURL + '/PaymentDetail/' + this.paymentData.OwnerId, this.paymentData);
  }
  deletePaymentDetail(id) {
    return this.http.delete(this.baseURL + '/PaymentDetail/' + id);
  }

  updateList() {
    this.http.get(this.baseURL + '/PaymentDetail')
    .toPromise()
    .then(res => this.paymentList = res as PaymentDetail[]);
  }
}
