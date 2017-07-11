import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['atoure@localhost.test', Validators.required],
      password: '123456',
      remember: 1
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authenticationService.login({
      email: this.loginForm.value.email, 
      password: this.loginForm.value.password
    }).subscribe(
      data => {
        console.log(data)
        if(data) this.router.navigate(["/room"]);
      },
      error => {
        this.error = error;
      });
  }

}
