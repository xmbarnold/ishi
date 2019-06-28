import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CryptoJS } from './../../../authentication/hmac-md5';
import * as CryptoJS from 'crypto-js';
// var hmac = require('./../../../authentication/hmac-md5.js');

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    uri = "https://sandbox-authservice.priad.ch/login";
    secret_key = "Co74Zdn8D6Mcf2NXa";
    computedHash = CryptoJS.HmacMD5(this.uri, this.secret_key);
    computedHashString = this.computedHash.toString(CryptoJS.enc.Base64);

    api_key = "i3_kim@hotmail.com";

    healthroute = 'https://sandbox-healthservice.priaid.ch';
    authroute = 'https://sandbox-authservice.priaid.ch';
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.api_key}:${this.computedHashString}`,
        // Authorization: `Bearer ${this.api_key}:${this.secret_key}`
    })
    api_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImkzX2tpbUBob3RtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNjQ1IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE2LTA4LTI1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1NjE3NDMxNDgsIm5iZiI6MTU2MTczNTk0OH0.KMr8VFWfEOLhcynrcLU8vPX_yFfvSbO1uPXBBmMcZg4"



    constructor (private _http: HttpClient) { }

    // API calls here
    // example

    getToken(){
        console.log(this.computedHashString);
        // console.log(this._http.post(`${this.authroute}/login?format=json&language=en-gb`, "", {headers:this.headers}));
        return this._http.post(`${this.uri}`, "", {headers:this.headers});
    }

    getBody(){
        // var auth = this._http.post(login url, credentials);
        return this._http.get(`${this.healthroute}/body/locations?token=${this.api_token}&format=json&language=en-gb`);
    }

    getSub(bodyID){
        return this._http.get(`${this.healthroute}/body/locations/${bodyID}?token=${this.api_token}&format=json&language=en-gb`);
    }

    getBodySublocationSymptoms(subBodyID, selectorStatus){ // man, woman, boy, girl
        return this._http.get(`${this.healthroute}/symptoms/${subBodyID}/${selectorStatus}?token=${this.api_token}&format=json&language=en-gb`);
    }

    getDiagnosis(selectedSymptoms, sex, yearOfBirth){
        return this._http.get(`${this.healthroute}/diagnosis?token=${this.api_token}&language=en-gb&symptoms=${selectedSymptoms}&gender=${sex}&year_of_birth=${yearOfBirth}`);
    }



}
