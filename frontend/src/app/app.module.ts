
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivitiesComponent } from './activities/activities.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { ActivitiesService } from './activities.service';
@NgModule({
    declarations: [
        AppComponent,
        ActivitiesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClient
    ],
    exports: [RouterModule],
    providers: [ActivitiesService],
    bootstrap: [AppComponent]
})
export class AppModule { }