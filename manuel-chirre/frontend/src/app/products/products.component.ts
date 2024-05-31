import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public productosService: ProductosService) { }

  sku: string = '';
  nombre: string = '';
  productos:any = [];
  ngOnInit(): void {
    this.getAll();
  }

  filter(){
    this.getAll();
    this.sku = '';
    this.nombre = '';
  }

  getAll(){
    this.productosService.getAll({sku: this.sku, nombre: this.nombre} ).subscribe( response => {
      if(response){
        this.productos = response.data
      }
    });
  }

}
