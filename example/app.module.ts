import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent } from "./home.component";
import { Routes, RouterModule  } from '@angular/router';
import { RepoListComponent } from "./repo-list.component";
import { CommonModule } from "@angular/common";
import { ReposService } from "./repos.service";

const appRoutes: Routes = [
{ path: '', component: RepoListComponent }
];

const routing = RouterModule.forRoot(appRoutes);
@NgModule({
    declarations: [
                  HomeComponent,
                  RepoListComponent
                  ],

    imports:      [
                  BrowserModule,
                  CommonModule,
                  routing,
                  HttpModule],

    bootstrap:    [HomeComponent],
    providers: [ReposService]
})
export class AppModule {

}
