webpackJsonp([1,4],{

/***/ 152:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 152;


/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(164);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(_Http, _modalService) {
        this._Http = _Http;
        this._modalService = _modalService;
        this.SERVER_URL = "http://localhost:3000";
        this.ERROR = "";
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({});
        this.path = [];
        this.folders = [];
        this.files = [];
        this.folderName = "";
        this.fileName = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._Http.get(this.SERVER_URL + "/tree").subscribe(function (response) {
            _this.path = ["dir"];
            var data = response.json();
            _this.folders = data.filter(function (x) { return x.isDir; });
            _this.files = data.filter(function (x) { return !x.isDir; });
        }, function (error) { _this.alertError(JSON.stringify(error)); });
    };
    AppComponent.prototype.alertError = function (message) {
        var _this = this;
        this.ERROR = message;
        this._modalService.open(this.errormodal).result.then(function (result) { _this.ERROR = ""; }, function (reason) { _this.ERROR = ""; });
    };
    AppComponent.prototype.openFolderModal = function (foldernamemodal) {
        var _this = this;
        this._modalService.open(foldernamemodal).result.then(function (result) {
            if (_this.folderName !== "") {
                _this.addFolder();
            }
            else {
                _this.alertError("Empty folder name !!");
            }
        }, function (reason) {
            _this.folderName = "";
        });
    };
    AppComponent.prototype.openFileModal = function (filenamemodal) {
        var _this = this;
        this._modalService.open(filenamemodal).result.then(function (result) {
            if (_this.fileName !== "") {
                _this.addFile();
            }
            else {
                _this.alertError("Empty file name !!");
            }
        }, function (reason) {
            _this.fileName = "";
        });
    };
    AppComponent.prototype.addFolder = function () {
        var _this = this;
        var dir = this.path.toString().replace(/,/g, "/");
        dir += "/" + this.folderName;
        this._Http.post(this.SERVER_URL + "/tree?dir=" + dir, {}).subscribe(function (response) {
            var data = response.json();
            if (data.error) {
                _this.alertError(data.error.code + "    " + data.error.errno + "  " + data.error.syscall);
            }
            else {
                _this.tree(data.path);
            }
        }, function (error) {
            _this.alertError(JSON.stringify(error));
        });
        this.folderName = "";
    };
    AppComponent.prototype.addFile = function () {
        var _this = this;
        var dir = this.path.toString().replace(/,/g, "/");
        this.uploader.setOptions({ url: 'http://localhost:3000/upload?dir=' + dir + "&name=" + this.fileName });
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = function (item, response, status, header) {
            if (status !== 200) {
                _this.alertError(status + " Upload error !!");
            }
            _this.fileName = "";
            _this.tree(dir);
            _this.uploader.clearQueue();
        };
    };
    AppComponent.prototype.deleteFolder = function (dir) {
        var _this = this;
        this._Http.delete(this.SERVER_URL + "/tree?dir=" + dir).subscribe(function (response) {
            var data = response.json();
            if (data.error) {
                _this.alertError(data.error.code + "    " + data.error.errno + "  " + data.error.syscall);
            }
            else {
                var ar = data.path.split("/");
                var p = "/" + ar[ar.length - 1];
                var dir = data.path.replace(p, "");
                _this.tree(dir);
            }
        }, function (error) { _this.alertError(JSON.stringify(error)); });
    };
    AppComponent.prototype.resolvePath = function (p, index) {
        var path = "";
        for (var i = 0; i < index; i++) {
            path += this.path[i] + "/";
        }
        path += p;
        this.tree(path);
    };
    AppComponent.prototype.tree = function (dir) {
        var _this = this;
        this._Http.get(this.SERVER_URL + "/tree?dir=" + dir).subscribe(function (response) {
            _this.path = dir.split('/');
            var data = response.json();
            _this.folders = data.filter(function (x) { return x.isDir; });
            _this.files = data.filter(function (x) { return !x.isDir; });
        }, function (error) { console.log(error); });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("error"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], AppComponent.prototype, "errormodal", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(221),
        styles: [__webpack_require__(218)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(162);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__["FileSelectDirective"]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// imports


// module
exports.push([module.i, ".divider{\r\n    margin-bottom: 50px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

module.exports = "<hr>\n<div class=\"text-center\">\n  <h1>Welcome to your file server</h1>\n</div>\n<hr class=\"divider\">\n<h3 class=\"text-center\">Path: \n  <strong *ngFor=\"let p of path; let i = index\"><button class=\"btn btn-default\" (click)=\"resolvePath(p,i)\">{{ p }}</button> /</strong>\n  </h3>\n  <hr class=\"divider\">\n<div class=\"row\">\n  \n  <div class=\"col-md-6\">\n    <button (click)=\"openFolderModal(foldernamemodal)\" class=\"btn btn-success float-right\" >Create new folder</button>\n    <h3 class=\"text-center\">folder: <strong>{{ folders.length  }}</strong></h3>\n    <hr>\n    <ul class=\"list-group\">\n      <li  *ngFor=\"let f of folders\" class=\"list-group-item\">\n        {{ f.name }}\n\n        <button (click)=\"tree(f.path)\" class=\"btn btn-primary float-right\" >-></button>\n        <button (click)=\"deleteFolder(f.path)\" class=\"btn btn-danger float-right\" >-</button>\n      </li>\n    </ul>\n  </div>\n  <div class=\"col-md-6\">\n    <button *ngIf=\"!uploader.isUploading\" (click)=\"openFileModal(filenamemodal)\" class=\"btn btn-success float-right\" >Upload new file</button>\n    <p *ngIf=\"uploader.isUploading\"  class=\" float-right\" >{{uploader.progress}} %</p>\n   \n    <h3 class=\"text-center\">Files:  <strong>{{ files.length  }}</strong></h3>\n    <hr>\n    <ul class=\"list-group\">\n      <li *ngFor=\"let f of files\" class=\"list-group-item\">\n        {{ f.name  }}\n        <a target=\"_blank\" href=\"{{SERVER_URL}}/upload?dir={{ f.path }}\" class=\"btn btn-primary float-right\" >-></a>\n        <button (click)=\"deleteFolder(f.path)\" class=\"btn btn-danger float-right\" >-</button>\n      </li>\n\n\n    </ul>\n  </div>\n</div>\n\n<ng-template #foldernamemodal let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">New Folder name</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"form-group\">\n      <label class=\"form-control-label\" for=\"f\">Folder name</label>\n      <input type=\"text\" class=\"form-control\" name=\"folder\" id=\"f\" [(ngModel)]=\"folderName\">\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('Close click')\">Valider</button>\n  </div>\n</ng-template>\n\n<ng-template #filenamemodal let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">New File name</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"form-group\">\n      <label class=\"form-control-label\" for=\"f\">File name</label>\n      <input type=\"text\" class=\"form-control\" name=\"file\" id=\"f\" [(ngModel)]=\"fileName\">\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"form-control-label\" for=\"fs\">File name</label>\n      <input ng2FileSelect  [uploader]=\"uploader\" type=\"file\" class=\"form-control-file\"  id=\"fs\" >\n    </div>\n\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('Close click')\">Valider</button>\n  </div>\n</ng-template>\n\n<ng-template #error let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">Error</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <p class=\"text-danger\">{{ ERROR }}</p>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('Close click')\">Close</button>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(153);


/***/ })

},[251]);
//# sourceMappingURL=main.bundle.js.map