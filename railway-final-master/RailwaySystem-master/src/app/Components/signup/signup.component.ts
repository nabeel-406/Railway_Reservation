import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedService } from 'src/app/shared.service';
import { NavbarService } from 'src/app/SharedService/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUpform = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('',[Validators.required , Validators.email]),
    mobile : new FormControl('' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]),
    address : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });
  submitted=false;
  get name() {
    return this.SignUpform.get('name');
  }
  get email() {
    return this.SignUpform.get('email');
  }
  get mobile() {
    return this.SignUpform.get('mobile');
  }
  get address() {
    return this.SignUpform.get('address');
  }
  get password() {
    return this.SignUpform.get('password');
  }

  constructor(private shared:SharedService, private router:Router,private nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }
  onSubmit() {
    this.submitted = true;
    if (this.SignUpform.invalid) {
      return;
  }

 this.shared.SaveUser(this.SignUpform.value).subscribe((res)=>{
 
   console.log(res);
   if(res==1){
    alert("Email already registered");
  }
  else{
    this.shared.EmailService(this.SignUpform.value.name,this.SignUpform.value.email).subscribe((res)=>{ })
    alert("Sign Up Successful");
    this.SignUpform.reset();
    this.router.navigate(['login']);
  }
 });
}
}
