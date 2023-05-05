
import { Component ,Input,OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() data: any;
  hoverForOk:boolean
  hoverForCancle:boolean
  constructor(public modal: NgbActiveModal) {}
  ngOnInit(): void {
    console.log(this.data,"hhhhhhh")
  }
}