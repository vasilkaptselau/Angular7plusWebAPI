import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PaymentDetailService } from '../../shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service: PaymentDetailService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    if (form != null) {
      form.form.reset();
    }
    this.service.paymentData = {
      OwnerId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CW: '',
    };
  }

  onSubmit(form: NgForm) {
    if (this.service.paymentData.OwnerId === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

    insertRecord(form: NgForm) {
      this.service.postPaymentDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('New record was added', 'Clients Payments Inf');
          this.service.updateList();
        },
        err => {
          console.log(err);
        }
      );
    }
    updateRecord(form: NgForm) {
      this.service.putPaymentDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.info('Record was updated', 'Clients Payments Inf');
          this.service.updateList();
        },
        err => {
          console.log(err);
        }
      );
    }
}
