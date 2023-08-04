import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // register success loading
  regSuccessLoading:string=""

  // register error message
  regErrorMsg:string=""

  constructor(private registerFB:FormBuilder, private api:ApiService, private registerRoute:Router){}

  // Form Group creation
  registerForm=this.registerFB.group({
    // Array creation
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  // Control passes to register.html

  register(){
    // console.log(this.registerForm.value);
    if(this.registerForm.valid){
      let username=this.registerForm.value.username
      let acno=this.registerForm.value.acno
      let password=this.registerForm.value.password
      this.api.register(acno,username,password).subscribe((result:any)=>{
        alert(result.message)
        this.regSuccessLoading=result.message
        setTimeout(()=>{
          this.registerRoute.navigateByUrl('')
        },3000)
        // redirected to login page
        // this.registerRoute.navigateByUrl('')
      },((result:any)=>{
        this.regErrorMsg=result.error.message
        
      }))
      setTimeout(()=>{
        this.registerForm.reset()
        this.regErrorMsg=""
      },2000)
          // alert('Registered')

    }else{
      alert('Invalid Data')
    }
  
  }
}
