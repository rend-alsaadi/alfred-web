import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class InventoryService {

    constructor(private http: Http) { }

    searchInventory(terms: string, endpoint: string) {
        let params = new HttpParams().set("name", terms)
        return this.http
            .get(environment.apiURL + endpoint, { params })
            .map(res => res.json());
    }
}