import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Validators , FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  public loginForm = this.formBuilder.group({
    correo: ['',Validators.required],
    password: ['',Validators.required]
});

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(response => {
      if (response.succest) {
        this.router.navigate(['/users']);
        this.snackBar.open('Bienvenido(a) ' + response.data.nombre, '', {
          duration: 2000
        });
      } else {
        this.snackBar.open('Error al iniciar sesión', '', {
          duration: 2000
        });
      }
    });
  }

}
