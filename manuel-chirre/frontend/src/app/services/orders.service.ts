import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAll(params: any){
    return this.http.get<Response>(environment.dev+ 'pedidos', { params: params });
  }

  getOrderDetail(numero_pedido: number){
    const params = {
      numero_pedido : numero_pedido
    }
    return this.http.get<Response>(environment.dev + 'pedidos/detail', { params: params });
  }
}
