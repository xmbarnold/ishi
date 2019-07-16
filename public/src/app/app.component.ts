import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'Not WebMD';
    bodyLocations;
    subLocations;
    sexSelector = "man";
    symptoms;
    selectedSymptoms = [];
    diagnosis;
    sex = "male";
    age = 1980;
    api_token;

    constructor(private _httpService: HttpService){}

    ngOnInit(){
        let observable = this._httpService.getToken();
        observable.subscribe((data)=>{
            console.log(data);
            this.api_token = data["Token"];
        })
    }
    getBodyLocations(){
        let observable = this._httpService.getBody(this.api_token);
        observable.subscribe((data) => {
            // console.log(data);
            this.bodyLocations = data;
            console.log(this.bodyLocations);
        })
    }
    getSubLocations(bodyID){
        let observable = this._httpService.getSub(bodyID, this.api_token);
        observable.subscribe((data) => {
            this.subLocations = data;
        })
    }
    getSymptoms(subBodyID){
        let observable = this._httpService.getBodySublocationSymptoms(subBodyID, this.sexSelector, this.api_token);
        observable.subscribe((data) => {
            this.symptoms = data;
            console.log(this.symptoms);
        })
    }
    setSex(val){
        this.sexSelector = val;
        if(val == "boy" || val == "girl"){
            this.age = 2010;
        }
        if(val == "boy" || val == "man"){
            this.sex = "male";
        }
        else{
            this.sex = "female";
        }
        console.log(this.sexSelector);
    }
    setSelectedSymptoms(symptomID){
        for(let i=0; i<this.selectedSymptoms.length; i++){
            if(this.selectedSymptoms[i] == symptomID){
                this.selectedSymptoms.splice(i,1);
                this.getDiagnosis();
                return undefined;
            }
        }
        this.selectedSymptoms.push(symptomID);
        this.getDiagnosis();
    }
    getDiagnosis(){
        let observable = this._httpService.getDiagnosis(JSON.stringify(this.selectedSymptoms), this.sex, this.age, this.api_token);
        observable.subscribe((data) =>{
            this.diagnosis = data;
            console.log(this.diagnosis);
        })
    }

    resetSelectedSymptoms(){
        this.selectedSymptoms = [];
        this.getDiagnosis();
    }
}
