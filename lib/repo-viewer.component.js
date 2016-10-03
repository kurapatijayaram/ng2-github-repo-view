"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var repo_viewer_service_1 = require("./repo-viewer.service");
var Rx_1 = require('rxjs/Rx');
var RepoViewer = (function () {
    function RepoViewer(_rvs, _window) {
        var _this = this;
        this._rvs = _rvs;
        this._window = _window;
        this._branches$ = new Rx_1.Subject();
        this._branchChange$ = new Rx_1.Subject();
        this._changeTree$ = new Rx_1.Subject();
        console.log("from construcotr");
        this._branches$.subscribe(function (data) {
            _this.branches = data;
            if (_this.defaultBranch == null) {
                _this.defaultBranch = _this.branches[0]["name"];
            }
            _this._branchChange$.next(_this.defaultBranch);
        });
        this._changeTree$.subscribe(function (data) {
            _this._rvs.fetchData(data).subscribe(function (data) { _this.repoData = data; });
        });
        this._branchChange$.subscribe(function (data) {
            _this._rvs.fetchBranch(_this.defaultBranch).subscribe(function (data) {
                _this._changeTree$.next({ type: "tree", sha: data.json().commit.commit.tree.sha, path: _this._rvs.repoName });
            });
        });
    }
    Object.defineProperty(RepoViewer.prototype, "handle", {
        set: function (value) {
            console.log("from setter");
            this._rvs.setUrl(value);
        },
        enumerable: true,
        configurable: true
    });
    RepoViewer.prototype.ngOnInit = function () {
        var _this = this;
        this._rvs.fetchBranches().subscribe(function (data) {
            _this._branches$.next(data.json());
        }, function (error) { });
    };
    RepoViewer.prototype.pathClick = function (treeObj) {
        this._changeTree$.next(treeObj);
    };
    RepoViewer.prototype.breadcrumbClick = function (treeObj, last) {
        if (!last) {
            this._changeTree$.next(treeObj);
        }
    };
    __decorate([
        core_1.Input("defaultBranch"), 
        __metadata('design:type', String)
    ], RepoViewer.prototype, "defaultBranch", void 0);
    __decorate([
        core_1.Input("handle"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], RepoViewer.prototype, "handle", null);
    RepoViewer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "repo-viewer",
            template: "\n              <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <select class=\"form-control\">\n                    <option *ngFor=\"let branch of branches\">{{branch.name}}</option>\n                  </select>\n                  <ol class=\"breadcrumb\">\n                    <li *ngFor=\"let crumb of _rvs.breadcrumbs;let lastIndex = last\"  [ngClass]=\"{'active': lastIndex}\">\n                      <a (click)=\"breadcrumbClick(crumb, lastIndex)\">{{crumb.path}}</a>\n                    </li>\n                  </ol>\n                  <div class=\"list-group\" *ngIf=\"repoData?.type=='tree'\">\n                    <a style=\"cursor: pointer;\" (click)=\"pathClick(item)\" class=\"list-group-item\"  *ngFor=\"let item of repoData.treeObjects\">\n                      <span class=\"glyphicon\" [ngClass]=\"{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}\">\n                        {{item.path}}\n                      </span>\n                    </a>\n                  </div>\n                  <textarea *ngIf=\"repoData?.type=='blob'\" class=\"form-control\" rows=\"15\" cols=\"35\">\n                    {{_window.atob(repoData.treeObjects.content)}}\n                  </textarea>\n                </div>\n              </div>\n            ",
            styleUrls: ['css/bootstrap.min.css'],
            providers: [repo_viewer_service_1.RepoViewerService, { provide: Window, useValue: window }]
        }), 
        __metadata('design:paramtypes', [repo_viewer_service_1.RepoViewerService, Window])
    ], RepoViewer);
    return RepoViewer;
}());
exports.RepoViewer = RepoViewer;
//# sourceMappingURL=repo-viewer.component.js.map