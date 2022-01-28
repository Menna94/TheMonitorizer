import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  toggleForm: boolean = false;


  signupForm: FormGroup = this._fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    pass: ['', Validators.required],
    cpass: ['', Validators.required]
  }, {
    validators: this.confirmPassword('pass', 'cpass')
  });

  loginForm: FormGroup = this._fb.group({
    email: ['',Validators.required],
    pass: ['',Validators.required]
  });
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  onSignup() {
    console.log(this.signupForm.value);


    this._auth.postSignUp(this.signupForm.value)

  }

  onLogin() {
    console.log(this.loginForm.value);
    this._auth.postLogin(this.loginForm.value);
    this._router.navigate([''])
  }

  toggleFormAction() {
    this.toggleForm = !this.toggleForm;
  }

  //getters
  get signupCtrls() {
    return this.signupForm.controls;
  }

  get loginCtrls() {
    return this.loginForm.controls;
  }

  private confirmPassword(pass: string, cpass: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[pass],
        passwordConfirmationInput = group.controls[cpass];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
