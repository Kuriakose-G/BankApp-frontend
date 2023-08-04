import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allTransactions:any[],searchTerm:string,propertyName:string): any[] {

    const result:any=[]

    // transformed output
    if(!allTransactions||searchTerm==''||propertyName==''){
      return allTransactions
    }
    // if there is any value in search term
    allTransactions.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
