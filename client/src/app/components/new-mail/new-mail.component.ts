import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-mail',
  templateUrl: './new-mail.component.html',
  styleUrls: ['./new-mail.component.css']
})
export class NewMailComponent implements OnInit {

  constructor(
    public _fb: FormBuilder,
    public _mail: MailService,
    public _r: Router
  ) { }

  public myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this._fb.group({
      to: ["", [Validators.required]],
      title: ["", [Validators.required, Validators.minLength(4)]],
      body: ""
    })
  }

  public handleSubmit() {
    this._mail.newmail(this.myForm.value).subscribe(
      (res: any) => {
        console.log(res)
        // redirect to main page
        this._r.navigateByUrl("/main/sent")
        // snackbar => notify user
        // this._user.openSnackbar("registered successfully")
      }, err => {
        console.log(err)
        // snackbar => notify user
        console.log(err)
        // this._user.openSnackbar("Error, please try again")
      }
    )
  }
}
