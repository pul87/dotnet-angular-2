import { AuthService } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { PhotoService } from './services/photo.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from './services/vehicle.service';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { PaginationComponent } from './components/shared/pagination-component/pagination.component';
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle";

Raven
  .config('https://b7a31838e56b497fb10075045f0a3b3e@sentry.io/200090')
  .install();

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent,
        PaginationComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        AuthService,
        VehicleService,
        PhotoService,
        ProgressService
    ]
};
