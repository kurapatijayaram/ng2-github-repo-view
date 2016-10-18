import { OnInit, OnDestroy } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";
export declare class RepoViewer implements OnInit, OnDestroy {
    private _rvs;
    private _window;
    defaultBranch: string;
    commitId: string;
    handle: string;
    branches: Object[];
    repoData: any;
    private _branches$;
    private _branchChange$;
    private _changeTree$;
    constructor(_rvs: RepoViewerService, _window: Window);
    ngOnInit(): void;
    pathClick(treeObj: any): void;
    breadcrumbClick(treeObj: any, last: any): void;
    ngOnDestroy(): void;
}
