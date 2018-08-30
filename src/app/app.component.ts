import { Component, OnInit } from '@angular/core';
import { NgModel } from '../../node_modules/@angular/forms';
import { member } from './user-dashboard/member';
import { dataService } from './services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  fontSizePx = 10;
  familyData:member;
  
  constructor(private familyDataService:dataService){
    
  }

  valChange(event:KeyboardEvent, value1, value2){
    //event.
    console.log(`val change ${event}` );
    console.log(event);
    console.log(value1);
    console.log(value2);
  }

  ngOnInit(){
    setTimeout(() => {
      console.log("Timer Completed !! ");
    }, 5000);

    this.familyDataService.dataObservable.subscribe( data => this.familyData = data );

    console.log(this.familyData);    

  }


  

}
