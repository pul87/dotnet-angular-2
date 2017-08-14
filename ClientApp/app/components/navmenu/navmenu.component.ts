import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    /**
     *
     */
    constructor(private authService: AuthService) {
        
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    isAuthenticated() {
        console.log("Autenticato? ", this.authService.isAuthenticated());
        return this.authService.isAuthenticated();
    }
}


