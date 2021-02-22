import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _server: ServerService,
    public _user: UserService,
    public _r: Router
  ) { }

  public myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(4)]]
    })
  }

  public handleSubmit() {
    this._server.login(this.myForm.value).subscribe(
      (res: any) => {
        console.log(res)
        // set the token in the local strage
        localStorage.at = res.access_token
        localStorage.rt = res.refresh_token
        // ---localStorage.setItem("token" ,res.token)
        // set the loggedUser object in the user service
        this._user.decode(res.access_token)
        // snackbar => notify user
        this._user.openSnackbar(this._user.loggedUser.isAdmin ? "welcome your honor" : "welcome back " + this._user.loggedUser.username)
      }, err => {
        // snackbar => notify user
        this._user.openSnackbar(err.error)
      }
    )
  }
}
