import { Component, OnInit, Input } from '@angular/core';
import { member } from './member';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  @Input() familyData:member;
  @Input() indent:number;
  indentObj;
  constructor() { }

  ngOnInit() {

      this.indent = this.indent + 20;
      this.indentObj = {'text-indent' : this.indent + 'px'};
    

}
}