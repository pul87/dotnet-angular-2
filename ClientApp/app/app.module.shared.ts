import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { ChartModule } from 'angular2-chartjs';
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
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
/*
Raven
  .config('https://b7a31838e56b497fb10075045f0a3b3e@sentry.io/200090')
  .install();
*/
export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        AdminComponent,
        VehicleFormComponent,
        VehicleListComponent,
        ViewVehicleComponent,
        PaginationComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AuthService,
        AUTH_PROVIDERS,
        VehicleService,
        PhotoService,
        AuthGuard,
        AdminAuthGuard
    ]
};
