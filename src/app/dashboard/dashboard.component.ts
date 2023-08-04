import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  // to delete account
  acno:any 
  deleteConfirmStatus:boolean=false;

  deleteSuccessStatus:string=''

  // holds logout status
  logoutStatus:boolean=false

  transferSuccess:string=''
  transferError:string=''

  // to hold current account number
  currentAcno:any;

  // to hold current username
  user:string=""
  balance:any;

  isCollapse:boolean=true;
  collapse(){
    this.isCollapse=!this.isCollapse
  }

  constructor(private transferFB:FormBuilder, private api:ApiService, private dashboardRouter:Router){}

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.dashboardRouter.navigateByUrl('')
    }
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||"";
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||"";
    }
    
  }

  transferForm=this.transferFB.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  getBalance(){
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.balance=result.balance
    },
    (result:any)=>{
      alert(result.error.message)
    })
  }

  fundTransfer(){
    if(this.transferForm.valid){
      // get details from fund transfer form
      let creditAcno=this.transferForm.value.acno
      let password=this.transferForm.value.password
      let amount=this.transferForm.value.amount
      this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
        // console.log(result); //successfully completed the transfer
        // alert(result.message)
        this.transferSuccess=result.message
        setTimeout(() => {
          this.transferForm.reset()
          this.transferSuccess=''
        }, 2000);
      },(result:any)=>{
        console.log(result.error.message);
        this.transferError=result.error.message
        setTimeout(() => {
          this.transferForm.reset()
          this.transferError=''
        }, 2000);
      })
    }else{
      alert('Invalid Data')
    }
  }

  reset(){
    this.transferForm.reset()
  }

  logout(){
    // to clear localStorage
    localStorage.clear()
    this.logoutStatus=true
    setTimeout(() => {
      this.dashboardRouter.navigateByUrl('')
    }, 2000);
  }

  deleteAccount(){
    this.acno=localStorage.getItem('currentAcno')
    this.deleteConfirmStatus=true
  }
  cancelDeleteAccount(){
    // back to normal
    this.acno=''
    this.deleteConfirmStatus=false
  }
  deleteFromParent(){
    this.api.deleteUser().subscribe((result:any)=>{
      localStorage.clear()
      this.deleteSuccessStatus=result.message //your account has been deleted
      setTimeout(() => {
        this.dashboardRouter.navigateByUrl('') 
      }, 2000);
      //navigate to login page
    })
  }
}
