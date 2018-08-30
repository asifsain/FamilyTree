import {memberDetails} from "./memberDetails";

export class member{
    name:String;
    memberDetail:memberDetails;
    children:member[];
    constructor(name:String, children:member[]=null){
        this.name = name;
        this.children = children;
        this.memberDetail = new memberDetails();
        this.memberDetail.name = this.name;
    }
  }