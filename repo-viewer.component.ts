import { Component, Input, OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";

@Component({
  moduleId: module.id,
  selector: "repo-viewer",
  template: `
              <div class="row">
                <div class="col-md-12">
                  <div class="list-group" *ngIf="_rvs.currentData?.tree">
                    <a style="cursor: pointer;" (click)="_rvs.fetchData(item.type, item.sha)" class="list-group-item"  *ngFor="let item of _rvs.currentData.tree">
                      <span class="glyphicon" [ngClass]="{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}">
                        {{item.path}}
                      </span>
                    </a>
                  </div>
                  <textarea *ngIf="_rvs.currentData?.content" class="form-control" rows="15" cols="35">
                    {{_window.atob(_rvs.currentData.content)}}
                  </textarea>
                </div>
              </div>
            `,
  styleUrls: ['css/bootstrap.min.css'],
  providers: [RepoViewerService, {provide: Window, useValue: window}]
})
export class RepoViewer implements OnInit{
  @Input("handle")
  set handle(value: string){
    this._rvs.setUrl(value);
  }
  constructor(private _rvs: RepoViewerService, private _window: Window){}

  ngOnInit(){

  }
}
