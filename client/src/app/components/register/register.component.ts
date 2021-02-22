import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      password: ["", [Validators.required, Validators.minLength(4)]],
      isAdmin: false
    })
  }

  public handleSubmit() {
    this._server.regiser(this.myForm.value).subscribe(
      (res: any) => {
        console.log(res)
        // redirect to main page
        this._r.navigateByUrl("/login")
        // snackbar => notify user
        this._user.openSnackbar("registered successfully")
      }, err => {
        console.log(err)
        // snackbar => notify user
        this._user.openSnackbar("Error, please try again")
      }
    )
  }

}
