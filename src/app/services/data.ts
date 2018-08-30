import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import {memberDetails} from "../user-dashboard/memberDetails";
import {member} from "../user-dashboard/member";

@Injectable()
export class dataService{

    familyData:member;
    dataSubject:BehaviorSubject<member>;
    dataObservable:Observable<member>

    
    constructor(){
        this.getFamilyTreeData();
        this.dataSubject = new BehaviorSubject(this.familyData);
        this.dataObservable = this.dataSubject.asObservable();
    }

    updateFamilyData(newFamilyData:member){
        this.dataSubject.next(newFamilyData);
    }

    getFamilyTreeData(){
        let fayha = new member("Fayha");
        let fauz = new member("Fauz");
        let wafeeqah = new member("Wafeeqah");
        let ayesha = new member("Ayesha");

        let shahzad = new member("Shahzad", [fayha, fauz]);
        let shenu = new member("Shenu", [wafeeqah]);
        let asif = new member("Asif", [ayesha]);


        let qamar = new member("Qamar", [shahzad,shenu,asif]);

        // -----------------------------------------------

        let ashar = new member("Ashar");
        let mukarram = new member("Mukarram");
        let hammad = new member("Hammad");
        let nahyan = new member("Nahyan");

        let akbar = new member("Akbar", [nahyan]);
        let rushi = new member("Rushi", [ashar,mukarram,hammad]);
        
        let shamsul = new member("Shamshul", [akbar,rushi]);

        // -----------------------------------------------

        let shaheer = new member("Shaheer");
        let shayaan = new member("Shayaan");
        let sobiya = new member("Sobiya");

        let aniqa = new member("Aniqa");
        let aayan = new member("Aayan");

        let ruby = new member("Ruby", [shaheer,shayaan]);
        let boby = new member("Boby", [sobiya]);
        let sadaf = new member("Sadaf", [aniqa,aayan]);
        
        let iffat = new member("Iffat", [ruby,boby,sadaf]);

        // -----------------------------------------------

        let nehal = new member("Nehal", [qamar,shamsul, iffat]);

        this.familyData = nehal;
    }






}