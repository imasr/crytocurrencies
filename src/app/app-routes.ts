import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecificCurrencyComponent } from './specific-currency/specific-currency.component';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }, {
        path: 'dashboard',
        component: DashboardComponent,
    },  {
        path: 'currencies/:id',
        component: SpecificCurrencyComponent,
    }
];
