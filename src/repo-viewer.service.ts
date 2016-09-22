import { Injectable } from "@angular/core";

@Injectable()
export class RepoViewerService {
  repoUrl: string

  setUrl(url: string){
    this.repoUrl = url
  }
}
