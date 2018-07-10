import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as Rx from "rxjs/Rx";

import mockedData from './mocked-data';

@Injectable()
export class KnowledgeBeforeAfterService {

  constructor(private _http: HttpClient) { }

  getData() {
    return Rx.Observable.of(mockedData);
  }

}