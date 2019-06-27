import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'public';
    bodyLocations;
    headLocations;

    constructor(private _httpService: HttpService){}

    ngOnInit(){
        // let observable = this._httpService.getToken();
        // observable.subscribe((data)=>{
        //     console.log(data);
        // })
    }
    getBodyLocations(){
        let observable = this._httpService.getBody();
        observable.subscribe(function (data) {
            console.log(data);
            this.bodyLocations = data;
            console.log(this.bodyLocations);
        })
    }
    getHeadLocations(){
        let observable = this._httpService.getHeadLocations();
        observable.subscribe((data) => {
            this.headLocations = data;
        })
    }
}
