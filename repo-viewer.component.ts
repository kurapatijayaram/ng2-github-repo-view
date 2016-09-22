import { Component, Input, OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";

@Component({
  selector: "repo-viewer",
  template: `
              <div class="list-group" *ngIf="_rvs.currentData?.tree">
                <a (click)="_rvs.fetchData(item.type, item.sha)" class="list-group-item"  *ngFor="let item of _rvs.currentData.tree">
                  <span class="glyphicon" [ngClass]="{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}">
                    {{item.path}}
                  </span>
                </a>
              </div>
              <textarea *ngIf="_rvs.currentData?.content" class="form-control" rows="3">
                {{_rvs.currentData.content}}
              </textarea>
            `,
  providers: [RepoViewerService]
})
export class RepoViewer implements OnInit{
  @Input("handle")
  set handle(value: string){
    this._rvs.setUrl(value);
  }
  constructor(private _rvs: RepoViewerService){}

  ngOnInit(){

  }
}
