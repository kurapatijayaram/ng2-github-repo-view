import { Injectable } from "@angular/core";
import { RESTClient, BaseUrl, GET, Path } from "angular2-rest";
import 'rxjs/Rx';
import { Http } from "@angular/http";

export interface ITreeObject{
  type: string,
  sha: string,
  path: string
}

@Injectable()
@BaseUrl("https://api.github.com")
export class RepoViewerService extends RESTClient{
  repoUrl: string;
  currentData: any;
  repoName: string;
  breadcrumbs: ITreeObject[]=[];
  private _userRepoPath: string;

  constructor(private _http: Http){
    super(_http);
  }

  setUrl(url: string){
    this.repoUrl = url;
    this._userRepoPath = this.repoUrl.replace("https://github.com/", "");
    this.repoName = this._userRepoPath.split("/")[1];
  }

  fetchData(treeObj: ITreeObject){
    let bIndex = this.breadcrumbs.indexOf(treeObj);
    if(bIndex == -1){
      this.breadcrumbs.push(treeObj);
    }else{
      this.breadcrumbs.splice(bIndex+1, this.breadcrumbs.length - (bIndex+1));
    }
    return this._fetchTree(
          this._userRepoPath,
          treeObj.type,
          treeObj.sha
        ).map(function(val, idx, obs){
          return {
                    "type": treeObj.type,
                    "treeObjects": (treeObj.type == "tree") ? JSON.parse(val._body).tree : JSON.parse(val._body)
                  }
        });
  }

  fetchBranch(branchName: string){
    return this._fetchBranch(this._userRepoPath, branchName);
  }

  fetchBranches(){
    return this._fetchBranches(this._userRepoPath);
  }

  @GET("/repos/{userRepo}/git/{type}s/{shaId}")
  private _fetchTree(@Path("userRepo") url: string, @Path("type") type: string, @Path("shaId") shaId: string){
    return null;
  }

  @GET("/repos/{userRepo}/branches/{branch}")
  private _fetchBranch(@Path("userRepo") url: string, @Path("branch") branch: string){
    return null;
  }

  @GET("/repos/{userRepo}/branches")
  private _fetchBranches(@Path("userRepo") url: string){
    return null;
  }
}
