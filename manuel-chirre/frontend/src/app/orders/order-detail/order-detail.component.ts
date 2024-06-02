import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public ordenDetail: any;
  constructor(public dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: any, public order: OrdersService) { }

  ngOnInit(): void {
    console.log(this.pedido.numero_pedido)
    this.getOrderDetail();
  }

  getOrderDetail(){
    this.order.getOrderDetail(this.pedido.numero_pedido).subscribe(response => {
      if(response.succest){
        this.ordenDetail = response.data;
      }
    })
  }
}
