import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    // Dummy API
    // uri = "https://sandbox-authservice.priaid.ch/login";
    // api_key = "i3_kim@hotmail.com";
    // secret_key = "Co74Zdn8D6Mcf2NXa";
    // healthroute = 'https://sandbox-healthservice.priaid.ch';

    // Live API
    uri = "https://authservice.priaid.ch/login";
    api_key = "p7T8B_GMAIL_COM_AUT";
    secret_key = "m2ZDz89NjSo76LiMy";
    healthroute = 'https://healthservice.priaid.ch';

    computedHash = CryptoJS.HmacMD5(this.uri, this.secret_key);
    computedHashString = this.computedHash.toString(CryptoJS.enc.Base64);

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.api_key}:${this.computedHashString}`,
    })


    constructor (private _http: HttpClient) { }

    // API calls here

    getToken(){
        console.log(this.computedHashString);
        return this._http.post(`${this.uri}`, "", {headers:this.headers});
    }

    getBody(api_token){
        return this._http.get(`${this.healthroute}/body/locations?token=${api_token}&format=json&language=en-gb`);
    }

    getSub(bodyID, api_token){
        return this._http.get(`${this.healthroute}/body/locations/${bodyID}?token=${api_token}&format=json&language=en-gb`);
    }

    getBodySublocationSymptoms(subBodyID, selectorStatus, api_token){ // man, woman, boy, girl
        return this._http.get(`${this.healthroute}/symptoms/${subBodyID}/${selectorStatus}?token=${api_token}&format=json&language=en-gb`);
    }

    getDiagnosis(selectedSymptoms, sex, yearOfBirth, api_token){
        return this._http.get(`${this.healthroute}/diagnosis?token=${api_token}&language=en-gb&symptoms=${selectedSymptoms}&gender=${sex}&year_of_birth=${yearOfBirth}`);
    }



}
