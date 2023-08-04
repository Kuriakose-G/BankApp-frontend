import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // register api call
  register(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:5000/register',body)
  }

  // login api call
  login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }

  // append token to the request header
  appendToken(){
    // to get the token from the local storage
    let token=localStorage.getItem('token')

    // create http header
    let headers=new HttpHeaders()

    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers
    }
    return options 
  }

  // get balance
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/balance/'+acno,this.appendToken())
  }

  // fund transfer
  fundTransfer(toAcno:any,password:any,amount:any){
    const body={
      toAcno,
      password,
      amount
    }
    return this.http.post('http://localhost:5000/fundtransfer',body,this.appendToken())
  }

  // get transacton info
  getTransaction(){
    return this.http.get('http://localhost:5000/transactions',this.appendToken())
  }

  // to delete user account
  deleteUser(){
    return this.http.delete('http://localhost:5000/deleteAccount',this.appendToken())
  }
}
