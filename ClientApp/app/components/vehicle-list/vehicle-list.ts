import { Vehicle, KeyValuePair } from './../app/models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor( private vehicleService: VehicleService) { }

    ngOnInit(): void {

        this.vehicleService.getMakes()
        .subscribe( makes => this.makes = makes);

        this.populateVehicles();
    }

    onFilterChange() {
        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getVehicles(this.filter)
        .subscribe( vehicles => this.vehicles = vehicles);
    }

    resetFilter() {
        this.filter = {};
        this.onFilterChange();
    }
}