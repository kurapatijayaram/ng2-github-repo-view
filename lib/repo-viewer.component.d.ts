import { OnInit } from "@angular/core";
import { RepoViewerService } from "./repo-viewer.service";
export declare class RepoViewer implements OnInit {
    private _rvs;
    private _window;
    handle: string;
    constructor(_rvs: RepoViewerService, _window: Window);
    ngOnInit(): void;
}
