import { Component, Input, OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service.ts";

@Component({
  selector: "repo-viewer",
  template: `
              <h4>hi:</h4>
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
