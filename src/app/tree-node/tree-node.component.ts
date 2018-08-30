import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { memberDetails } from '../user-dashboard/memberDetails';
//import * as $ from 'jquery';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit, AfterViewInit {

  @Input() data:memberDetails;
  @Input() styleObj;
  constructor() { }

  ngOnInit() {
    // console.log($(this.data));
    // console.log($(this.styleObj));
    this.styleObj = {position : "absolute", 
            left : this.data.left + 'px', 
            top : this.data.top + 'px', 
            width : this.data.width + 'px', 
            height : this.data.height + 'px',
            border_style : "solid"
          };
  }

  ngAfterViewInit() {
      $('#'+this.data.memberId).draggable();
      
      
      // line(190, 225, 352, 225);
  }

  onDrag(){
    console.log("hi there");
  }

  slideToggle(){
    console.log("control has reached here");
    // $('.title').slideToggle(); //
  }

}
