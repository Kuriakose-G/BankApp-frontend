import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  

  @Input() deleteAcno:any 

  // generate an event for deleting - onCancel
  @Output() onCancel = new EventEmitter() //child to parent(no)

  @Output() onDelete = new EventEmitter() //child to parent(yes)


  cancel(){
    this.onCancel.emit()
  }

  deleteFromChild(){
    this.onDelete.emit()
  }

}
