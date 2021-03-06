import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RepoViewerService, ITreeObject } from "./repo-viewer.service";
import { Subject} from 'rxjs/Rx';

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
                  <div class="list-group" *ngIf="repoData?.type=='tree'">
                    <a style="cursor: pointer;" (click)="pathClick(item)" class="list-group-item"  *ngFor="let item of repoData.treeObjects">
                      <span class="glyphicon" [ngClass]="{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}">
                        {{item.path}}
                      </span>
                    </a>
                  </div>
                  <textarea *ngIf="repoData?.type=='blob'" class="form-control" rows="15" cols="35">
                    {{_window.atob(repoData.treeObjects.content)}}
                  </textarea>
                </div>
              </div>
            `,
  styleUrls: ['css/bootstrap.min.css'],
  providers: [RepoViewerService, {provide: Window, useValue: window}]
})
export class RepoViewer implements OnInit, OnDestroy {
  @Input("branch") defaultBranch: string;
  @Input("commitId") commitId: string;

  @Input("handle")
  set handle(value: string){
    this._rvs.setUrl(value);
  }

  branches: Object[];
  repoData: any;
  
  private _branches$ = new Subject<Object[]>();
  private _branchChange$ = new Subject<string>();
  private _changeTree$ = new Subject<ITreeObject>();

  constructor(private _rvs: RepoViewerService, private _window: Window){
    this._branches$.subscribe(
      (data) => {
        this.branches = data;
        if(this.defaultBranch == null){
          this.defaultBranch = this.branches[0]["name"];
        }
        this._branchChange$.next(this.defaultBranch);
      }
    )

    this._changeTree$.subscribe(
      (data) => {
        this._rvs.fetchData(data).subscribe(
              (data) => {this.repoData = data}
        )
      }
    )

    this._branchChange$.subscribe(
      (data) => {
        this._rvs.fetchBranch(this.defaultBranch).subscribe(
          (data) => {
            this._changeTree$.next({type: "tree", sha: data.commit.tree.sha, path: this._rvs.repoName});
          }
        )
      }
    )
  }

  ngOnInit(){
    if(this.commitId == null){
      this._rvs.fetchBranches().subscribe(
        (data) => {
          this._branches$.next(data.json())
        },
        (error) => {}
      )
    }else{
      this._rvs.fetchCommit(this.commitId).subscribe(
        (data) => {
          this._changeTree$.next({type: "tree", sha: data.commit.tree.sha, path: this._rvs.repoName});
        }
      )
    }
    
  }

  pathClick(treeObj){
    this._changeTree$.next(treeObj);
  }

  breadcrumbClick(treeObj, last){
    if(!last){
      this._changeTree$.next(treeObj);
    }
  }

  ngOnDestroy() {
    this._branches$.unsubscribe();
    this._branchChange$.unsubscribe();
    this._changeTree$.unsubscribe();
  }
}
