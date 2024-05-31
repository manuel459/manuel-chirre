import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public nro_pedido: string = '';
  pedidos: any = [];
  constructor(public orderService:OrdersService) { }

  ngOnInit(): void {
    this.getAll();
  }

  filter(){
    this.getAll();
    this.nro_pedido = '';
  }

  getAll(){
    this.orderService.getAll({nro_pedido: this.nro_pedido} ).subscribe( response => {
      if(response.succest){
        this.pedidos = response.data
      }
    });
  }

}
