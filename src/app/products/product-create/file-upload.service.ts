import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class FileUploadService{
  constructor(private http: HttpClient, private router: Router){}

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'C:\\Users\\Yonas\\Desktop\\Project ingenieurie\\ecomm_new\\upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData , { headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })}).pipe(map(() => { return true; }));
}
}
