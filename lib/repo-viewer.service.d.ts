import { RESTClient } from "angular2-rest";
import { Http } from "@angular/http";
export declare class RepoViewerService extends RESTClient {
    private _http;
    repoUrl: string;
    currentData: any;
    private _userRepoPath;
    constructor(_http: Http);
    setUrl(url: string): void;
    fetchData(type: string, shaId: string): void;
    private _fetchTree(url, type, shaId);
    private _fetchMaster(url);
}
