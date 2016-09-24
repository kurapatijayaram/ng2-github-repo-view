import { Component, Input, OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";

@Component({
  moduleId: module.id,
  selector: "repo-viewer",
  template: `
              <div class="row">
                <div class="col-md-12">
                  <ol class="breadcrumb">
                    <li *ngFor="let crumb of _rvs.breadcrumbs;let lastIndex = last"  [ngClass]="{'active': lastIndex}">
                      <a (click)="breadcrumbClick(crumb, lastIndex)">{{crumb.path}}</a>
                    </li>
                  </ol>
                  <div class="list-group" *ngIf="_rvs.currentData?.type=='tree'">
                    <a style="cursor: pointer;" (click)="_rvs.fetchData(item)" class="list-group-item"  *ngFor="let item of _rvs.currentData.treeObjects">
                      <span class="glyphicon" [ngClass]="{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}">
                        {{item.path}}
                      </span>
                    </a>
                  </div>
                  <textarea *ngIf="_rvs.currentData?.type=='blob'" class="form-control" rows="15" cols="35">
                    {{_window.atob(_rvs.currentData.treeObjects.content)}}
                  </textarea>
                </div>
              </div>
            `,
  styleUrls: ['css/bootstrap.min.css'],
  providers: [RepoViewerService, {provide: Window, useValue: window}]
})
export class RepoViewer{
  @Input("handle")
  set handle(value: string){
    this._rvs.setUrl(value);
  }
  constructor(private _rvs: RepoViewerService, private _window: Window){}

  breadcrumbClick(treeObj, last){
    if(!last){
      this._rvs.fetchData(treeObj)
    }
  }
}
