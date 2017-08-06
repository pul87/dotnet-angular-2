import { SaveVehicle } from './../components/app/models/vehicle';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
    constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) {}

    getMakes() {
        return this.http.get(`${this.originUrl}/api/makes`)
        .map( res => res.json());
    }

    getFeatures() {
        return this.http.get(`${this.originUrl}/api/features`)
        .map( res => res.json());
    }

    create(vehicle) {
        return this.http.post(`${this.originUrl}/api/vehicles`, vehicle)
        .map( res => res.json());
    }

    update(vehicle: SaveVehicle) {
        return this.http.put(`${this.originUrl}/api/vehicles/${vehicle.id}`, vehicle)
        .map( res => res.json());
    }

    delete(id: number) {
        return this.http.delete(`${this.originUrl}/api/vehicles/${id}`)
        .map( res => res.json());
    }

    getVehicle(id) {
        return this.http.get(`${this.originUrl}/api/vehicles/${id}`)
        .map( res => res.json());
    }
}