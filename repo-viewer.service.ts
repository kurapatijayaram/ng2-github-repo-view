import { Injectable } from "@angular/core";
import { RESTClient, BaseUrl, GET, Path } from "angular2-rest";
import { Observable } from "rxjs/Rx";
import { Http } from "@angular/http";

@Injectable()
@BaseUrl("https://api.github.com")
export class RepoViewerService extends RESTClient{
  repoUrl: string;
  currentData: any;
  private _userRepoPath: string;

  constructor(private _http: Http){
    super(_http)
  }

  setUrl(url: string){
    this.repoUrl = url
    this._userRepoPath = this.repoUrl.replace("https://github.com/", "")
    this._fetchMaster(this._userRepoPath).subscribe(
      (data) => {
                  this.fetchData("tree", data.json().commit.commit.tree.sha)
                },
      (error) => {console.log(error)}
    )
  }

  fetchData(type: string, shaId: string){
    switch(type){
      case "tree":
                  type="trees";
                  break;
      case "blob":
                  type="blobs";
                  break;
    }
    
    this._fetchTree(
          this._userRepoPath,
          type,
          shaId
        ).subscribe(
          (tree) => {this.currentData = tree.json()},
          (error) => {console.log(error)}
        )
  }

  @GET("/repos/{userRepo}/git/{type}/{shaId}")
  private _fetchTree(@Path("userRepo") url: string, @Path("type") type: string, @Path("shaId") shaId: string){
    return null;
  }

  @GET("/repos/{userRepo}/branches/master")
  private _fetchMaster(@Path("userRepo") url: string){
    return null;
  }
}
