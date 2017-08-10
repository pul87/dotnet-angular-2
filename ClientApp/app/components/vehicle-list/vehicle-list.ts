import { Vehicle, KeyValuePair } from './../app/models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {
    
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    query: any = {};
    columns = [
        { title: 'Id', key: 'id' },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model' },
        { title: 'Contact Name', key: 'contactName', isSortable: true },
        { }
    ];

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
        this.vehicleService.getVehicles(this.query)
        .subscribe( vehicles => this.vehicles = vehicles);
    }

    resetFilter() {
        this.query = {};
        this.onFilterChange();
    }

    sortBy(columnName) {

        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }
}