import { Component, OnInit } from '@angular/core';
import { memberDetails } from "../user-dashboard/memberDetails";
import { member } from "../user-dashboard/member";
import { dataService } from '../services/data';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  data: memberDetails;
  familyData: member;
  memberList: Map<number, memberDetails> = new Map();
  defaultGroupWidth = 100;

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

    this.drawLines(this.memberList);

  }

  drawLines(memberList:Map<number, memberDetails>){
    memberList.forEach(member => {
      
       
      if(member.childCount > 0){

        // for horizontal lines
        let firstChild = this.getMemberObject(member.childrenIdList.get(0));
        let lastChild = this.getMemberObject(member.childrenIdList.get(member.childCount-1));

        let firstChildCenter = firstChild.left + (firstChild.width/2);
        let lastChildCenter = lastChild.left + (lastChild.width/2);

        //let start_left = member.groupleft;
        let start_left = firstChildCenter;
        let horizontal_top = member.top + member.height + 5;
        // let end_left = member.groupleft + member.groupwidth;
        let end_left = lastChildCenter;

        // console.log(`drawing line - for for member id = ${member.memberId} with this coordinate ${start_left}, ${top}, ${end_left}`);
        console.log($('#'+member.memberId));
        $('#maindiv').line(start_left, horizontal_top, end_left, horizontal_top);


        // vertical lines 
        member.childrenIdList.forEach((value, key) => {
            let childMember = this.getMemberObject(value);
            let childMemberCenter = childMember.left + childMember.width/2;
            let vertical_left = childMemberCenter;
            let vertical_start_top = horizontal_top;
            let vertical_end_top = childMember.top;

            $('#maindiv').line(vertical_left, vertical_start_top, vertical_left, vertical_end_top);

        })

        let memberCenter = member.left + member.width/2;
        let member_vertical_start_top = member.top + member.height;
        let member_vertical_start_end = member.top + member.height + 5;
        let member_vertical_left = memberCenter;
        $('#maindiv').line(member_vertical_left, member_vertical_start_top, member_vertical_left, member_vertical_start_end);

      }

      

      
    })
  }

/**
 * set memberDetail - parentId
 * set memberDetail - selfChildIndex
 * set memberDetail - memberId
 * set memberDetail - isRoot
 * set memberDetail - childList
 * set memberDetail - groupWidth
 * Then add memberDetail object to a flat list. 
 */
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
        nodeMember.memberDetail.groupwidth += childMember.memberDetail.groupwidth 

        
        childIndex++;
      });

    }
    else { // This is LEAF
     nodeMember.memberDetail.groupwidth = this.defaultGroupWidth;
    }
  }

/**
 * Go through every item on the Flat List.
 * Every Item Sets the Left and Top of its Child Items. 
 */
  setMemberStyleSisterObject(member: memberDetails) {

    let top = 50;
    let left = 1500;

    /** 
     * Execute Below Block ONLY ONCE for ROOT 
     * */
    if (member.isRoot) {
      // place itself 
      member.left = left;
      member.top = top;

      // intialize position for children
      member.groupleft = ((member.left + member.width/2)) - (member.groupwidth / 2);
    }
    
    // set the child group left with current member group left. 
    let childgroupcurerntleft = member.groupleft;

    // if item is not leaf, i.e. it has children
    if (member.childrenIdList.size > 0) {
      member.childrenIdList.forEach((value,key) => {
        console.log(`key : ${key} , value : ${value}`);

        let childMember = this.getMemberObject(value);

        childMember.groupleft = childgroupcurerntleft;

        // setting the left of child member
        childMember.left = childMember.groupleft + childMember.groupwidth / 2 - childMember.width / 2;

        // setting top
        childMember.top = member.top + 70;

        // setting groupLeft for next child. 
        childgroupcurerntleft += childMember.groupwidth;

        console.log(`name : ${childMember.name} left : ${childMember.left} top : ${childMember.top}`)
      })
    }
  // }

    console.log("-----------------------");
  }

  

  

  // ---------------------------------- Helper Methods ------------------------- //

  getMemberObject(memberId): memberDetails {
    return this.memberList.get(memberId);

  }

  generateUniqueMemberId(member: member): number {

    let nameCode = 0;
    let random = Math.floor(Math.random()*1000);

    for (let i = 0; i < member.memberDetail.name.length; i++) {  
      nameCode += member.memberDetail.name.charCodeAt(i)
    }

    return new Date().valueOf() + nameCode + random;

  }

}
