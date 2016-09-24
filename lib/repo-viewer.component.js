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
var RepoViewer = (function () {
    function RepoViewer(_rvs, _window) {
        this._rvs = _rvs;
        this._window = _window;
    }
    Object.defineProperty(RepoViewer.prototype, "handle", {
        set: function (value) {
            this._rvs.setUrl(value);
        },
        enumerable: true,
        configurable: true
    });
    RepoViewer.prototype.breadcrumbClick = function (treeObj, last) {
        if (!last) {
            this._rvs.fetchData(treeObj);
        }
    };
    __decorate([
        core_1.Input("handle"), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], RepoViewer.prototype, "handle", null);
    RepoViewer = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "repo-viewer",
            template: "\n              <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <ol class=\"breadcrumb\">\n                    <li *ngFor=\"let crumb of _rvs.breadcrumbs;let lastIndex = last\"  [ngClass]=\"{'active': lastIndex}\">\n                      <a (click)=\"breadcrumbClick(crumb, lastIndex)\">{{crumb.path}}</a>\n                    </li>\n                  </ol>\n                  <div class=\"list-group\" *ngIf=\"_rvs.currentData?.type=='tree'\">\n                    <a style=\"cursor: pointer;\" (click)=\"_rvs.fetchData(item)\" class=\"list-group-item\"  *ngFor=\"let item of _rvs.currentData.treeObjects\">\n                      <span class=\"glyphicon\" [ngClass]=\"{'glyphicon-file': (item.type=='blob'), 'glyphicon-folder-close': (item.type=='tree')}\">\n                        {{item.path}}\n                      </span>\n                    </a>\n                  </div>\n                  <textarea *ngIf=\"_rvs.currentData?.type=='blob'\" class=\"form-control\" rows=\"15\" cols=\"35\">\n                    {{_window.atob(_rvs.currentData.treeObjects.content)}}\n                  </textarea>\n                </div>\n              </div>\n            ",
            styleUrls: ['css/bootstrap.min.css'],
            providers: [repo_viewer_service_1.RepoViewerService, { provide: Window, useValue: window }]
        }), 
        __metadata('design:paramtypes', [repo_viewer_service_1.RepoViewerService, Window])
    ], RepoViewer);
    return RepoViewer;
}());
exports.RepoViewer = RepoViewer;
//# sourceMappingURL=repo-viewer.component.js.map