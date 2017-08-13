import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {

    constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) { }

    upload(vehicleId, file) {
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.originUrl}/api/vehicles/${vehicleId}/photos`, formData)
        .map(res => res.json());
    }
}