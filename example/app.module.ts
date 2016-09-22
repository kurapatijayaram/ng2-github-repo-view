import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { RepoViewer } from "ng2-github-repo-view";

@NgModule({
    declarations: [
                  HomeComponent,
                  RepoViewer
                  ],

    imports:      [
                  BrowserModule,
                  CommonModule,
                  HttpModule],

    bootstrap:    [HomeComponent]
})
export class AppModule {

}
