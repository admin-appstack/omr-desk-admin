import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HttpService {
    // API_URL will be prefixed directly in the API endpoints or passed fully.
    public API_URL: string = '';

    constructor(private _http: HttpClient) {}

    get(url: string, params?: any, withCredentials = false, showLoader = true): Observable<any> {
        return this._http.get(this.API_URL + url, {
            params,
            withCredentials,
            reportProgress: showLoader,
            observe: 'body', // Emit only the final response body, not intermediate progress events
        });
    }

    post(url: string, body?: any, withCredentials = false, showLoader = true): Observable<any> {
        return this._http.post(this.API_URL + url, body, {
            withCredentials,
            reportProgress: showLoader,
            observe: 'body', // Emit only the final response body, not intermediate progress events
        });
    }

    put(url: string, body?: any, withCredentials = false, showLoader = true, isFileUpload = false): Observable<any> {
        const options: any = {
            reportProgress: showLoader,
            withCredentials: withCredentials,
            observe: 'body', // Emit only the final response body, not intermediate progress events
        };

        if (!isFileUpload) {
            options.headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
        }

        return this._http.put(this.API_URL + url, body, options);
    }

    uploadFile(url: string, formData: FormData, showLoader = true): Observable<any> {
        return this.put(url, formData, false, showLoader, true);
    }

    delete(url: string, body?: any, withCredentials = false, showLoader = true): Observable<any> {
        const options: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: body,
            withCredentials: withCredentials,
            reportProgress: showLoader,
            observe: 'body', // Emit only the final response body, not intermediate progress events
        };
        return this._http.delete(this.API_URL + url, options);
    }
}
