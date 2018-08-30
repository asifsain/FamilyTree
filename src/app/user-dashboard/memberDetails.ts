export class memberDetails{
    isRoot:boolean;
    name:String;
    memberId:number;
    parentId:number;
    selfChildIndex:number;
    childCount:number;
    childrenIdList:Map<number,number> = new Map();
    top:number;
    left:number;
    height:number = 50;
    width:number = 80;
    groupleft:number = 0;
    groupwidth:number = 0;
    constructor(){
        
    }
  }