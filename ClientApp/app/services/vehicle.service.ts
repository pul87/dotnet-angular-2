import { SaveVehicle } from './../components/app/models/vehicle';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
    // AuthHttp è un wrapper dell'http di Angular, ma controlla nel localStorage se esiste un item con chiave token e se esiste lo aggiunge alla request
    constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string, private authHttp : AuthHttp) {}

    getMakes() {
        return this.http.get(`${this.originUrl}/api/makes`)
        .map( res => res.json());
    }

    getFeatures() {
        return this.http.get(`${this.originUrl}/api/features`)
        .map( res => res.json());
    }

    create(vehicle) {
        return this.authHttp.post(`${this.originUrl}/api/vehicles`, vehicle)
        .map( res => res.json());
    }

    update(vehicle: SaveVehicle) {
        return this.authHttp.put(`${this.originUrl}/api/vehicles/${vehicle.id}`, vehicle)
        .map( res => res.json());
    }

    delete(id: number) {
        return this.authHttp.delete(`${this.originUrl}/api/vehicles/${id}`)
        .map( res => res.json());
    }

    getVehicle(id) {
        return this.http.get(`${this.originUrl}/api/vehicles/${id}`)
        .map( res => res.json());
    }

    getVehicles(filter) {
        return this.http.get(`${this.originUrl}/api/vehicles?${this.toQueryString(filter)}`)
        .map( res => res.json());
    }

    toQueryString(obj) {
        var parts = [];
        for ( var property in obj ) {
            var value = obj[property];
            if ( value != null && value != undefined )
                parts.push(`${encodeURIComponent(property)}=${encodeURIComponent(value)}` );
        }

        return parts.join('&');
    }
}