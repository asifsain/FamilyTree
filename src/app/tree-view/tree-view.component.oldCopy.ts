import { Component, OnInit } from '@angular/core';
import { memberDetails } from "../user-dashboard/memberDetails";
import { member } from "../user-dashboard/member";
import { dataService } from '../services/data';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  data: memberDetails;
  familyData: member;
  memberList: Map<number, memberDetails> = new Map();
  horizontalMargin:number = 20;
  defaultGroupWidth = 50;

  constructor(private familyDataService: dataService) {

    
  }

  ngOnInit() {
    this.familyDataService.dataObservable.subscribe(data => this.familyData = data);

    // Hierarchical Data to Flat Data
    this.extractAndAdd(this.familyData);
    console.log("After setting Hierarchicha Data");
    console.log(this.memberList);

    // Setting Position Data to Member List
    // this.memberList.forEach(member => this.setMemberStyleObject(member))
    this.memberList.forEach(member => this.setMemberStyleSisterObject(member))

    console.log("After setting Position Data");
    console.log(this.memberList);



  }



  extractAndAdd(nodeMember: member, parentId: number = null, selfIndex: number = 0) {
    let memberDetail = nodeMember.memberDetail;

    //console.log('this is extract and add method');

    // Setting ParentID and SelfChildIndex
    if (parentId != null) {
      memberDetail.parentId = parentId;
      memberDetail.selfChildIndex = selfIndex;
    } else
      memberDetail.isRoot = true;


    // Generate & Set Member ID
    memberDetail.memberId = this.generateUniqueMemberId(nodeMember);
    //console.log(memberDetail.memberId);


    // Add the Item on the FLAT LIST
    this.memberList.set(memberDetail.memberId, memberDetail);



    // Recursively Set the Children
    if (nodeMember.children != null) {
      memberDetail.childCount = nodeMember.children.length;
      let childIndex = 0;

      // FOR EACH CHILD
      nodeMember.children.forEach(childMember => {

        // GOING IN CHILD RECURSIVELY
        this.extractAndAdd(childMember, memberDetail.memberId, childIndex);
        // CAME OUT - SO UPDATE current node groupwidth. 

        memberDetail.childrenIdList.set(childIndex, childMember.memberDetail.memberId);
        nodeMember.memberDetail.groupwidth += childMember.memberDetail.groupwidth + this.horizontalMargin;
        childIndex++;
      });

    }
    else { // This is LEAF
      nodeMember.memberDetail.groupwidth = this.defaultGroupWidth;
    }
  }


  setMemberStyleSisterObject(member: memberDetails) {
    let horizontal_margin = 20;
    let vertical_margin = 20;

    let parentObj: memberDetails;

    if (member.parentId != undefined)
      parentObj = this.getMemberObject(member.parentId);

    let childGroupLeft = 0;
    let siblingCount = 0;
    let top = 50;
    let left = 500;
    let totalWidth = 0;
    let position_to_move_left = 0;



    
    
    let childgroupcurerntleft = member.groupleft;

    if (member.isRoot) {
      // place itself 
      member.left = left;
      member.top = top;

      // intialize position for children
      member.groupleft = ((member.left + member.width/2)) - (member.groupwidth / 2);
      childgroupcurerntleft = member.groupleft;

      // set children
      // member.childrenIdList.forEach((value,key) => {
      //   console.log(`key : ${key} , value : ${value}`);
      //   let childMember = this.getMemberObject(value);
      //   childMember.groupleft = childgroupcurerntleft + this.horizontalMargin;
      //   childMember.left = childMember.groupleft + childMember.groupwidth / 2 - childMember.width / 2;
      //   childMember.top = member.top + 70;
      //   childgroupcurerntleft += childMember.groupwidth;
      //   console.log(`name : ${childMember.name} left : ${childMember.left} top : ${childMember.top}`)
      // })
    }
    // else{
    // place its child objects 
    

    // if item is not leaf, i.e. it has children
    if (member.childrenIdList.size > 0) {
      member.childrenIdList.forEach((value,key) => {
        console.log(`key : ${key} , value : ${value}`);
        let childMember = this.getMemberObject(value);
        childMember.groupleft = childgroupcurerntleft + this.horizontalMargin;
        childMember.left = childMember.groupleft + childMember.groupwidth / 2 - childMember.width / 2;
        childMember.top = member.top + 70;
        childgroupcurerntleft += childMember.groupwidth;
        console.log(`name : ${childMember.name} left : ${childMember.left} top : ${childMember.top}`)
      })
    }
  // }



    

    console.log("-----------------------");
  }

  setMemberStyleObject(member: memberDetails) {
    let horizontal_margin = 20;
    let vertical_margin = 20;

    let parentObj: memberDetails;

    if (member.parentId != undefined)
      parentObj = this.getMemberObject(member.parentId);

    let childGroupLeft = 0;
    let siblingCount = 0;
    let top = 50;
    let left = 500;
    let totalWidth = 0;
    let position_to_move_left = 0;


    if (parentObj == null) {
      // this is the root object. 

    } else {
      siblingCount = parentObj.childCount;
      console.log(`siblingCount - ${siblingCount}`);
      totalWidth = (siblingCount - 1) * (member.width + horizontal_margin);

      top = parentObj.top + parentObj.height + vertical_margin;

      // odd 
      if (siblingCount % 2 > 0) {
        console.log("odd");
        position_to_move_left = (siblingCount - 1) / 2;
        console.log(`position to move left - ${position_to_move_left}`);
        childGroupLeft = parentObj.left - position_to_move_left * (member.width + horizontal_margin)
        console.log(`parent obj left position -  ${parentObj.left}`);
        console.log(childGroupLeft);
      }
      else {// even
        console.log("even");
        position_to_move_left = siblingCount / 2;
        console.log(`position to move left - ${position_to_move_left}`);
        childGroupLeft = parentObj.left + (parentObj.width / 2) - (horizontal_margin / 2) - position_to_move_left;

      }
      console.log(childGroupLeft);
      console.log(member.width);
      console.log(horizontal_margin);

      left = childGroupLeft + (member.selfChildIndex * (member.width + horizontal_margin));

      console.log(left);

    }

    member.left = left;
    member.top = top;


    console.log(`name : ${member.name} left : ${member.left} top : ${member.top}`)

    console.log("-----------------------");
  }

  
  // will update the member position and cascade the update through its children. 
  updateMemberPosition(member: memberDetails) {

  }

  // ---------------------------------- Helper Methods ------------------------- //

  getMemberObject(memberId): memberDetails {
    return this.memberList.get(memberId);

  }

  generateUniqueMemberId(member: member): number {

    let nameCode = 0;

    for (let i = 0; i < member.memberDetail.name.length; i++) {
      nameCode += member.memberDetail.name.charCodeAt(i)
    }

    return new Date().valueOf() + nameCode;

  }

}
