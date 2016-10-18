import { RESTClient } from "angular2-rest";
import 'rxjs/Rx';
import { Http } from "@angular/http";
export interface ITreeObject {
    type: string;
    sha: string;
    path: string;
}
export declare class RepoViewerService extends RESTClient {
    private _http;
    repoUrl: string;
    currentData: any;
    repoName: string;
    breadcrumbs: ITreeObject[];
    private _userRepoPath;
    constructor(_http: Http);
    setUrl(url: string): void;
    fetchData(treeObj: ITreeObject): any;
    fetchBranch(branchName: string): any;
    fetchBranches(): any;
    fetchCommit(commitId: string): any;
    private _fetchTree(url, type, shaId);
    private _fetchBranch(url, branch);
    private _fetchBranches(url);
    private _fetchCommit(url, commitId);
}
