import { OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";
export declare class RepoViewer implements OnInit {
    private _rvs;
    handle: string;
    constructor(_rvs: RepoViewerService);
    ngOnInit(): void;
}
