import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  allTransactions:any=[]
  searchTerm:string='';

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getTransaction().subscribe((result:any)=>{
      console.log(result);
      this.allTransactions=result.transaction //array
      
    },(result:any)=>{
      console.log(result.error.message);
      
    })
  }

  exportPdf(){
    //1. Create an object for jspdf
    var pdf=new jsPDF()

    //2. Setup title row for table
    let thead=['Type','From Account','To Account', 'Amount']
    let tbody=[] //transaction array

    //3. Setup properties for pdf
    pdf.setFontSize(16)
    pdf.text('Mini Statements',15,10)

    //4. To display as table, need to convert array of object to nested array
    for(let item of this.allTransactions){ //all transactions - array of object
      let temp=[item.type,item.fromAcno,item.toAcno,item.amount]
      tbody.push(temp)
    }

    //5. Converted nested array to table structure using jspdf-autotable
    (pdf as any).autoTable(thead,tbody)

    //6. To open pdf in another tab
    pdf.output('dataurlnewwindow')

    //7. to download or save pdf
    pdf.save('Transaction History.pdf')
  }

}
