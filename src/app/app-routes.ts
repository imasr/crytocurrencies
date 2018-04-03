import { Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';
import { SpecificCurrencyComponent } from './specific-currency/specific-currency.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: CurrenciesComponent
    }, {
        path: 'currencies',
        component: CurrenciesComponent,
    },  {
        path: 'currencies/:currencyName',
        component: SpecificCurrencyComponent,
    } 
];
