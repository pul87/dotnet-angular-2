import { VehicleService } from './../../services/make.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})

export class VehicleFormComponent implements OnInit {
    constructor(
        private vehicleService: VehicleService) { };

    makes: any[];
    models: any[];
    features: any[];
    vehicle: any = {};
    
    ngOnInit(): void {
        this.vehicleService.getMakes().subscribe(makes => this.makes = makes);
        this.vehicleService.getFeatures().subscribe(features => this.features = features);
    }

    onMakeChange() {
        var selectedMake = this.makes.find( m => m.id == this.vehicle.make);
        this.models = selectedMake ? selectedMake.models : [];
    }
}