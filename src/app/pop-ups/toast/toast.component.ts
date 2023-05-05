import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  hover:boolean
  @Input() data: any;
  message:string
  constructor(public modal: NgbActiveModal) {}
  ngOnInit(): void {
    this.message=this.data
    console.log(this.data,"hhhhhhh")
  }
}
