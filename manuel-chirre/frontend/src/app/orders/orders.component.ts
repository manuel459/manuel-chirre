import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  filterDate = null;
  type_date = ['fecha_pedido', 'fecha_recepcion', 'fecha_entrega']
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public nro_pedido: string = '';
  pedidos: any = [];
  constructor(public orderService:OrdersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  filter(){
    this.getAll();
  }

  refresh(){
    this.filterDate = null;
    this.nro_pedido = '';
    this.range.reset();
    this.getAll();
  }

  getAll(){
    this.orderService.getAll({nro_pedido: this.nro_pedido,tipo_fecha: this.filterDate, fecha_inicio: this.range.value.start?.toLocaleDateString(), fecha_fin: this.range.value.end?.toLocaleDateString()} ).subscribe( response => {
      if(response.succest){
        this.pedidos = response.data
      }
    });
  }

  getDetail(pedido: any){
    let dialogRef = this.dialog.open(OrderDetailComponent, {
      height: '500px',
      width: '700px',
      data: pedido
    });
  }

}
