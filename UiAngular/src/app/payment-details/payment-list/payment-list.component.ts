import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {PaymentDetailService} from '../../shared/payment-detail.service';
import {PaymentDetail} from '../../shared/payment-detail.model';



@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  constructor(private service: PaymentDetailService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.service.updateList();
  }

  populateForm(paydtl: PaymentDetail) {
    this.service.paymentData = Object.assign({}, paydtl);
  }

  onDelete(OwnerId) {
    if (confirm('Are you sure ?')) {
      this.service.deletePaymentDetail(OwnerId)
        .subscribe(res => {
          this.service.updateList();
          this.toastr.warning('Record was deleted', 'Clients Payments Inf');
        },
          err => {
            console.log(err);
          });
    }
  }
}
