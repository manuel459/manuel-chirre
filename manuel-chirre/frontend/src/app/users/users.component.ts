import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  filterRole = null;
  workers:any = [];
  roles = ['ENCARGADO', 'VENDEDOR', 'REPARTIDOR', 'DELIVERY']
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
  }

  refresh(){
    this.filterRole = null;
    this.getAll();
  }
  
  getAll(){
    this.userService.getAll({ rol: this.filterRole}).subscribe(response => {
      if(response.succest){
        this.workers = response.data;
      }
    })
  }

}
