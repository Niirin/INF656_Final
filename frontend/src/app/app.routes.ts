
import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./activities/activities.component').then((m) => m.ActivitiesComponent)
        },
    },
    {
        path: 'activities',
        loadComponent:() => {
            return import('./activities/activities.component').then((m) => m.ActivitiesComponent);
        },
    }

];