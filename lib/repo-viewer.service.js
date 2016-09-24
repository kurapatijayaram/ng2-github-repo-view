"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var angular2_rest_1 = require("angular2-rest");
require('rxjs/Rx');
var http_1 = require("@angular/http");
var RepoViewerService = (function (_super) {
    __extends(RepoViewerService, _super);
    function RepoViewerService(_http) {
        _super.call(this, _http);
        this._http = _http;
        this.breadcrumbs = [];
    }
    RepoViewerService.prototype.setUrl = function (url) {
        var _this = this;
        this.repoUrl = url;
        this._userRepoPath = this.repoUrl.replace("https://github.com/", "");
        this.repoName = this._userRepoPath.split("/")[1];
        this._fetchMaster(this._userRepoPath).subscribe(function (data) {
            _this.fetchData({ type: "tree", sha: data.json().commit.commit.tree.sha, path: _this.repoName });
        }, function (error) { console.log(error); });
    };
    RepoViewerService.prototype.fetchData = function (treeObj) {
        var _this = this;
        var bIndex = this.breadcrumbs.indexOf(treeObj);
        if (bIndex == -1) {
            this.breadcrumbs.push(treeObj);
        }
        else {
            this.breadcrumbs.splice(bIndex + 1, this.breadcrumbs.length - (bIndex + 1));
        }
        this._fetchTree(this._userRepoPath, treeObj.type, treeObj.sha).map(function (val, idx, obs) {
            return {
                "type": treeObj.type,
                "treeObjects": (treeObj.type == "tree") ? JSON.parse(val._body).tree : JSON.parse(val._body)
            };
        }).subscribe(function (data) { _this.currentData = data; }, function (error) { console.log(error); });
    };
    RepoViewerService.prototype._fetchTree = function (url, type, shaId) {
        return null;
    };
    RepoViewerService.prototype._fetchMaster = function (url) {
        return null;
    };
    __decorate([
        angular2_rest_1.GET("/repos/{userRepo}/git/{type}s/{shaId}"),
        __param(0, angular2_rest_1.Path("userRepo")),
        __param(1, angular2_rest_1.Path("type")),
        __param(2, angular2_rest_1.Path("shaId")), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [String, String, String]), 
        __metadata('design:returntype', void 0)
    ], RepoViewerService.prototype, "_fetchTree", null);
    __decorate([
        angular2_rest_1.GET("/repos/{userRepo}/branches/master"),
        __param(0, angular2_rest_1.Path("userRepo")), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [String]), 
        __metadata('design:returntype', void 0)
    ], RepoViewerService.prototype, "_fetchMaster", null);
    RepoViewerService = __decorate([
        core_1.Injectable(),
        angular2_rest_1.BaseUrl("https://api.github.com"), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RepoViewerService);
    return RepoViewerService;
}(angular2_rest_1.RESTClient));
exports.RepoViewerService = RepoViewerService;
//# sourceMappingURL=repo-viewer.service.js.map