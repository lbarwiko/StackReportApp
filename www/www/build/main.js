webpackJsonp([5],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_fund_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_security_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_holding_service__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_security_security__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InvestmentsPage = (function () {
    function InvestmentsPage(navCtrl, navParams, fundService, authService, menuCtrl, securityService, applicationRef, loadingCtrl, holdingService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fundService = fundService;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.securityService = securityService;
        this.applicationRef = applicationRef;
        this.loadingCtrl = loadingCtrl;
        this.holdingService = holdingService;
        this.user = this.authService.user;
    }
    InvestmentsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.fund = this.navParams.get('param');
        this.totalPrice = 0;
        console.log("holdings", this.fund.holdings);
        console.log(this.fund);
        if (this.fund.holdings && (!this.fund.holdings[0] || !this.fund.holdings[0].security)) {
            this.securityService.getBatch(this.fund.holdings)
                .then(function (securities) {
                _this.fund.setHoldings(_this.holdingService.holdingMetaToHolding(_this.fund.holdings, securities));
                _this.calculateTotalPrice();
                console.log("totalPrice", _this.totalPrice);
                console.log("this.fund", _this.fund);
                _this.applicationRef.tick();
                _this.loading.dismiss();
            })
                .catch(function (err) {
                _this.loading.dismiss();
                console.log(err);
            });
        }
        else {
            this.calculateTotalPrice();
            this.applicationRef.tick();
            this.loading.dismiss();
        }
    };
    InvestmentsPage.prototype.calculateTotalPrice = function () {
        var _this = this;
        this.totalPrice = 0;
        this.fund.holdings.forEach(function (holding) {
            _this.totalPrice += holding.security.current_price * holding.num_shares;
        });
    };
    InvestmentsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    InvestmentsPage.prototype.openStockPage = function (stock) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_security_security__["a" /* SecurityPage */], {
            param: stock
        });
    };
    InvestmentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-investments',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/investments/investments.html"*/'<ion-content class="investments-content">\n    <ion-row class=\'fund-name\'>\n        {{fund.name || "TEST"}} ({{fund.id || "TEST" | uppercase}})\n    </ion-row>\n    <div class = \'table\'>\n        <div class="row header">\n          <div class="col">Security</div>\n          <div class="col" style=\'text-align: right;\'>Current Price</div>\n          <div class="col" style=\'text-align: right;\'>Shares Held</div>\n          <div class="col" style=\'text-align: right;\'>Percent</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let holding of fund.holdings">\n            <div *ngIf="holding.security" class="row" (click)="openStockPage(holding.security)">\n              <div class="col">{{holding.security.name}}({{holding.security.id}})</div>\n              <div class="col" style=\'text-align: right;\'>${{holding.security.current_price}}</div>\n              <div class="col" style=\'text-align: right;\'>{{holding.num_shares}}</div>\n              <div class="col" style=\'text-align: right;\'>{{holding.percent_share | number : \'1.2-2\'}}%\n              </div>\n            </div>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/investments/investments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__services_fund_service__["a" /* FundService */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__services_security_service__["a" /* SecurityService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__services_holding_service__["a" /* HoldingService */]])
    ], InvestmentsPage);
    return InvestmentsPage;
}());

//# sourceMappingURL=investments.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fund_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_prediction_service__ = __webpack_require__(188);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReportsPage = (function () {
    function ReportsPage(navCtrl, navParams, fundService, menuCtrl, authService, predictionService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fundService = fundService;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.predictionService = predictionService;
        this.security = null;
        this.user = authService.user;
        this.buyPredictions = [];
        this.sellPredictions = [];
        this.lastUpdated = "1/1/2000";
        this.current_page = 0;
        this.has_prev_page = false;
    }
    ReportsPage.prototype.ngOnInit = function () {
        this.security = this.navParams.get('param');
        this.getPredictions(this.current_page);
    };
    ReportsPage.prototype.getPredictions = function (page_number) {
        var _this = this;
        this.predictionService.getPredictions(this.security.id, page_number)
            .then(function (predictionList) {
            console.log(predictionList);
            if (predictionList.next != "") {
                _this.has_prev_page = true;
            }
            else {
                _this.has_prev_page = false;
            }
            _this.lastUpdated = predictionList.data[0].meta.date_predicted;
            predictionList.data[0].prediction.forEach(function (pred) {
                if (pred.order_type == 1) {
                    _this.buyPredictions.push(pred);
                }
                else if (pred.order_type == -1) {
                    _this.sellPredictions.push(pred);
                }
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ReportsPage.prototype.prevButton = function () {
        this.clearData();
        this.current_page = this.current_page + 1;
        this.getPredictions(this.current_page);
    };
    ReportsPage.prototype.nextButton = function () {
        this.clearData();
        if (this.current_page > 0) {
            this.current_page = this.current_page - 1;
        }
        this.getPredictions(this.current_page);
    };
    ReportsPage.prototype.mostRecentButton = function () {
        this.clearData();
        this.current_page = 0;
        this.getPredictions(this.current_page);
    };
    ReportsPage.prototype.clearData = function () {
        this.lastUpdated = "1/1/2000";
        this.buyPredictions.length = 0;
        this.sellPredictions.length = 0;
    };
    ReportsPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    ReportsPage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    ReportsPage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    ReportsPage.prototype.navUserInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserPage */]);
    };
    ReportsPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    ReportsPage.prototype.navPortfolioPage = function () {
        this.menuCtrl.toggle();
    };
    ReportsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reports',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/reports/reports.html"*/'<ion-content class="reports-content" padding>	\n    <ion-row class=\'fund-name\'>\n        {{security.name || "TEST"}} ({{security.id || "TEST" | uppercase}})\n    </ion-row>\n\n    <ion-row class="buttons">\n      <button *ngIf="has_prev_page" class=\'btn prev\' (click)="prevButton()">\n        Previous\n      </button>\n      <button *ngIf="current_page != 0" class= \'btn most-recent\' (click)="mostRecentButton()">\n        Most Recent\n      </button>\n      <button *ngIf="current_page != 0" class="btn next" (click)="nextButton()">\n        Next\n      </button>\n    </ion-row>\n    <ion-row class=\'last-update\'>\n      {{lastUpdated | date:\'shortDate\'}}\n    </ion-row>\n    <ion-row class = "label">\n    	Buys\n    </ion-row>\n    <table class = \'table\'>\n        <div class="row header">\n          <div class="col top">Name</div>\n          <div class="col top" style=\'text-align: right;\'>Amount</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let buyPred of buyPredictions">\n            <div class="row">\n              <div class="col">{{buyPred.security_id | uppercase}}</div>\n              <div class="col" style=\'text-align: right;\'>{{buyPred.amount}}</div>\n            </div>\n        </div>\n    </table>\n    <ion-row class = "label">\n    	Sells\n	</ion-row>\n	<table class = \'table\'>\n        <div class="row header">\n          <div class="col top">Ticker</div>\n          <div class="col top" style=\'text-align: right;\'>Amount</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let sellPred of sellPredictions">\n            <div class="row">\n              <div class="col">{{sellPred.security_id | uppercase}}</div>\n              <div class="col" style=\'text-align: right;\'>{{sellPred.amount}}</div>\n            </div>\n        </div>\n    </table>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/reports/reports.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__services_prediction_service__["a" /* PredictionService */]])
    ], ReportsPage);
    return ReportsPage;
}());

//# sourceMappingURL=reports.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams, loadingCtrl, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.registerCredentials = { username: '', email: '', password: '', confirm: '' };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        console.log('Register');
        this.showLoading();
        var registerCredentials = {
            username: this.registerCredentials.username,
            email: this.registerCredentials.email,
            password: this.registerCredentials.password
        };
        this.authService.registerUser(registerCredentials)
            .then(function (user) {
            console.log("Here");
            _this.loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
        })
            .catch(function (err) {
            _this.loading.dismiss();
            alert(err);
            location.reload();
            console.log(err);
        });
        //this.restapiProvider.CreateAccount(registerCredentials);
        //;
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/register/register.html"*/'<ion-content class="register-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    	<h1 id = "StackReportTitle"> StackReport! </h1>\n      	<img id = "logo" src="../../assets/img/logo-image-for-login-page.png"/>\n      	<h2 id = "SignInHeader"> Sign in! </h2>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="register-box">\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="registerCredentials.username" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Confirm Password" name="confirm" [(ngModel)]="registerCredentials.confirm" required></ion-input>\n            </ion-item>\n                        \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Register Account</button>\n        </ion-col>\n      </ion-row>\n    </form>          \n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RootPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__onboarding_onboarding__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RootPage = (function () {
    function RootPage(loadingCtrl, alertCtrl, authService, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigateToStartPage();
    }
    RootPage.prototype.ionViewDidLoad = function () {
    };
    RootPage.prototype.navigateToStartPage = function () {
        var _this = this;
        this.authService.flow()
            .then(function (user) {
            if (user) {
                if (user.username.indexOf('anon') == 0) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__onboarding_onboarding__["a" /* OnboardingPage */]);
                }
                else {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
                }
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            }
        })
            .catch(function (err) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        });
    };
    /*public createAccount(){
      console.log('Navigate to register page.');
      this.navCtrl.push(RegisterPage);
    }
  
    public login(){
  
      
      google how to find if ionic is in dev mode
      send post request to localhost:8000/api/auth, production endpoint
      create endpoint service, if dev export localhost endpoint else export production endpoint
      
      
      this.showLoading();
      console.log('login');
      this.authService.login({username: this.loginCredentials.username, password: this.loginCredentials.password})
      .then(user => {if(user.username) this.navCtrl.setRoot(HomePage);});
        this.navCtrl.setRoot(HomePage);
    }*/
    RootPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RootPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    RootPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-root',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/root/root.html"*/'<ion-content class="root-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    	<h1 id = "StackReportTitle"> StackReport! </h1>\n      	<img id = "logo" src="../../assets/img/logo-image-for-login-page.png"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/root/root.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], RootPage);
    return RootPage;
}());

//# sourceMappingURL=root.js.map

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 136;

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_user__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthService = (function () {
    function AuthService(storage, http, endpointService) {
        this.storage = storage;
        this.http = http;
        this.endpointService = endpointService;
    }
    AuthService.prototype.login = function (loginCredentials) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.endpointService.base + this.endpointService.auth, loginCredentials, options).toPromise()
            .then(function (res) {
            console.log(res);
            if (res && res.status == 401) {
                return Promise.reject({
                    err: 'Invalid username or password',
                    code: 401
                });
            }
            var resJson = res.json();
            if (resJson.err) {
                return _this.handleServerError(resJson);
            }
            _this.user = new __WEBPACK_IMPORTED_MODULE_6__models_user__["a" /* User */](resJson);
            _this.token = _this.user.token;
            return _this.storage.set('token', _this.user.token);
        })
            .then(function (tokenSet) {
            return Promise.resolve(_this.user);
        })
            .catch(function (err) {
            console.log(err);
            if (err && err.status == 401 || err.status == 403) {
                return _this.handleInvalidCredentials;
            }
            return _this.handleErrorPromise;
        });
    };
    AuthService.prototype.getStoredTokenAndUser = function () {
        var _this = this;
        if (this.user) {
            return Promise.resolve(this.user);
        }
        else if (this.token) {
            return this.getUserFromToken();
        }
        else {
            return this.getStoredToken()
                .then(function (token) {
                if (!token) {
                    return Promise.resolve(null);
                }
                return _this.getUserFromToken();
            })
                .catch(function (err) {
                return _this.handleErrorPromise(err);
            });
        }
    };
    AuthService.prototype.flow = function () {
        var _this = this;
        return this.isFirstTime()
            .then(function (firstTime) {
            if (firstTime) {
                return _this.registerAnon();
            }
            return _this.getUser();
        })
            .catch(function (err) { return Promise.resolve(null); });
    };
    AuthService.prototype.getStoredToken = function () {
        var _this = this;
        if (this.token) {
            return Promise.resolve(this.token);
        }
        return this.storage.get('token')
            .then(function (token) {
            _this.token = token;
            return Promise.resolve(_this.token);
        })
            .catch(this.handleTokenErrorPromise);
    };
    AuthService.prototype.logout = function () {
        this.storage.remove('token');
    };
    AuthService.prototype.getUser = function () {
        if (this.user) {
            console.log(this.user);
            return Promise.resolve(this.user);
        }
        else {
            if (this.token) {
                console.log(this.token);
                return this.getUserFromToken();
            }
            else {
                return this.getStoredTokenAndUser();
            }
        }
    };
    AuthService.prototype.getUserFromToken = function () {
        var _this = this;
        if (!this.token) {
            return Promise.reject(null);
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this.token
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.endpointService.base + this.endpointService.me, options).toPromise()
            .then(function (res) {
            console.log(res);
            if (res.status == 401) {
                return _this.handleInvalidCredentials;
            }
            var resJson = res.json();
            if (resJson.err) {
                return _this.handleServerError(resJson);
            }
            resJson['token'] = _this.token;
            _this.user = new __WEBPACK_IMPORTED_MODULE_6__models_user__["a" /* User */](resJson);
            return Promise.resolve(_this.user);
        })
            .catch(function (err) {
            return _this.handleErrorPromise(err);
        });
    };
    AuthService.prototype.registerUser = function (user) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.endpointService.base + '/api/u/', user, options).toPromise()
            .then(function (res) {
            return Promise.resolve(_this.extractData(res));
        })
            .then(function (userRes) {
            if (!userRes || userRes.err) {
                console.log("Found error", userRes);
                return Promise.reject(userRes.err);
            }
            _this.user = new __WEBPACK_IMPORTED_MODULE_6__models_user__["a" /* User */](userRes);
            _this.token = _this.user.token;
            return _this.storage.set('token', _this.token);
        })
            .then(function (res) {
            console.log("Set token");
            return Promise.resolve(_this.user);
        })
            .catch(function (err) { return Promise.reject(err); });
    };
    AuthService.prototype.registerAnon = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var payload = {
            anon: true
        };
        return this.http.post(this.endpointService.base + '/api/u/', payload, options).toPromise()
            .then(function (res) {
            return Promise.resolve(_this.extractData(res));
        })
            .then(function (userRes) {
            if (!userRes || userRes.err) {
                console.log("Found error", userRes);
                return Promise.reject(userRes.err);
            }
            _this.user = new __WEBPACK_IMPORTED_MODULE_6__models_user__["a" /* User */](userRes);
            _this.token = _this.user.token;
            return _this.storage.set('token', _this.token);
        })
            .then(function (res) {
            return Promise.resolve(_this.user);
        })
            .catch(function (err) { return Promise.reject(null); });
    };
    AuthService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.json();
        console.log(body);
        return body || {};
    };
    AuthService.prototype.isFirstTime = function () {
        //return Promise.resolve(true);
        var _this = this;
        return this.storage.get('stackreportEntry')
            .then(function (isFirstTime) {
            if (isFirstTime) {
                return Promise.resolve(false);
            }
            return _this.storage.set('stackreportEntry', true);
        })
            .then(function (res) {
            if (!res) {
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        })
            .catch(function (err) {
            return _this.storage.set('stackreportEntry', true)
                .then(function (res) {
                return Promise.resolve(true);
            })
                .catch(function (err) {
                return Promise.resolve(true);
            });
        });
    };
    AuthService.prototype.handleInvalidCredentials = function () {
        return this.handleServerError({
            err: 'Invalid username or password'
        });
    };
    AuthService.prototype.handleServerError = function (error) {
        console.log(error);
        alert(error.err);
        location.reload();
        return Promise.reject(error);
    };
    AuthService.prototype.handleTokenErrorPromise = function (error) {
        var _this = this;
        this.storage.remove('token');
        return this.storage.set('token', null)
            .then(function (res) {
            _this.handleErrorPromise({
                err: 'Something Went Wrong!'
            });
        });
    };
    AuthService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        alert(error.message || error);
        location.reload();
        return Promise.reject(error.message || error);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__endpoint_service__["a" /* EndpointService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/investments/investments.module": [
		502,
		4
	],
	"../pages/login/login.module": [
		503,
		3
	],
	"../pages/register/register.module": [
		504,
		2
	],
	"../pages/reports/reports.module": [
		505,
		1
	],
	"../pages/root/root.module": [
		506,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 179;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HoldingMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Holding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__security__ = __webpack_require__(52);

var HoldingMeta = (function () {
    function HoldingMeta(security_id, num_shares) {
        this.security_id = security_id;
        this.num_shares = num_shares;
    }
    return HoldingMeta;
}());
var Holding = (function () {
    function Holding(security, num_shares, id, name, current_price, volume_traded, price_history) {
        this.num_shares = num_shares;
        if (security) {
            this.security = security;
        }
        else {
            this.security = new __WEBPACK_IMPORTED_MODULE_0__security__["b" /* Security */](id, name, current_price, volume_traded, price_history);
        }
    }
    Holding.prototype.setPercent = function (percent) {
        this.percent_share = percent;
    };
    return Holding;
}());

//# sourceMappingURL=holding.model.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(params) {
        if (!params || !params.username) {
            console.log('Returning empty user');
            return this;
        }
        //Required Params
        if (!params || params.user_id == null || params.username == null || params.token == null) {
            throw "Missing required field";
        }
        this.user_id = params.user_id;
        this.username = params.username;
        this.token = params.token;
        this.tier = params.tier;
        this.role = params.role;
        this.email = params.email;
        this.anon = params.anon;
        return this;
    }
    User.prototype.getToken = function () {
        return this.token;
    };
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.getUserId = function () {
        return this.user_id;
    };
    User.prototype.getTier = function () {
        return this.tier;
    };
    User.prototype.getRole = function () {
        return this.role;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    return User;
}());

;
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_security__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { Holding } from '../models/holding.model';
var SecurityService = (function () {
    function SecurityService(http, endpointService, authService) {
        this.http = http;
        this.endpointService = endpointService;
        this.authService = authService;
        this.url = this.endpointService.base + '/api/security';
    }
    SecurityService.prototype.get = function (security_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + security_id, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                console.log("response: ", resJson);
                return resolve(resJson);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    SecurityService.prototype.getBatch = function (holding_metas) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            var reqUrl = _this.url + '?symbols=';
            holding_metas.forEach(function (holding_meta) {
                reqUrl += holding_meta.security_id + ',';
            });
            console.log(reqUrl);
            _this.http.get(reqUrl, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                console.log("Reponse", resJson);
                var securities = [];
                for (var i = 0; i < resJson.length; i += 1) {
                    securities.push(_this.parseSecurity(resJson[i]));
                }
                console.log("New response", securities);
                return resolve(securities);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    SecurityService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    SecurityService.prototype.parseSecurity = function (res) {
        var price_history = [];
        for (var i = 0; i < res.price_history.length; i++) {
            price_history.push({
                "date": res.price_history[i].date,
                "price": res.price_history[i].close
            });
        }
        // must be reversed because IEX has least recent first
        price_history = price_history.reverse();
        return new __WEBPACK_IMPORTED_MODULE_6__models_security__["b" /* Security */](res.security_id, res.security_name, res.quote.latestPrice, res.quote.latestVolume, price_history);
    };
    SecurityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]])
    ], SecurityService);
    return SecurityService;
}());

//# sourceMappingURL=security.service.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoldingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_holding_model__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HoldingService = (function () {
    function HoldingService() {
    }
    HoldingService.prototype.holdingMetaToHolding = function (holding_metas, securities) {
        // console.log("holdingService", holding_metas, securities);
        var holdings = [];
        for (var i = 0; i < holding_metas.length; i++) {
            // console.log("pushing", holding_metas[i], securities[i]);
            holdings.push(new __WEBPACK_IMPORTED_MODULE_1__models_holding_model__["a" /* Holding */](securities[i], holding_metas[i].num_shares, null, null, null, null, null));
        }
        console.log("holdings returned", holdings);
        return holdings;
    };
    HoldingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], HoldingService);
    return HoldingService;
}());

//# sourceMappingURL=holding.service.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_tier_service__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserPage = (function () {
    function UserPage(navCtrl, navParams, authService, menuCtrl, tierService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.tierService = tierService;
        this.alertCtrl = alertCtrl;
        this.current_user = authService.user;
        this.tier_options = [];
        this.listTiers();
    }
    UserPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    UserPage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    UserPage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    UserPage.prototype.navUserInfo = function () {
        this.menuCtrl.toggle();
    };
    UserPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    UserPage.prototype.navPortfolioPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    UserPage.prototype.listTiers = function () {
        var _this = this;
        this.tierService.listTiers()
            .then(function (tier_list) {
            tier_list.forEach(function (tier) {
                console.log(tier);
                if (tier.tier_type != "FREE") {
                    _this.tier_options.push(tier.tier_type + " (" + tier.max_reports + " custom reports)");
                }
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    UserPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you sure?',
            message: 'Your card will be charged for this action.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.updateTier();
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    UserPage.prototype.showCancelConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you sure?',
            message: 'You will lose all funds you are following.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.cancelSubscription();
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    UserPage.prototype.updateTier = function () {
        var _this = this;
        // get the name of the tier
        var paren_index = this.selected_value.indexOf('(');
        var new_tier = this.selected_value.substring(0, paren_index - 1);
        this.tierService.putTier(new_tier)
            .then(function (status) {
            _this.current_user.tier = new_tier;
        })
            .catch(function (err) {
            alert("Operation unsuccessful");
            console.log(err);
        });
    };
    UserPage.prototype.cancelSubscription = function () {
        var _this = this;
        this.tierService.putTier("FREE")
            .then(function (status) {
            _this.current_user.tier = "FREE";
        })
            .catch(function (err) {
            alert("Operation unsuccessful");
            console.log(err);
        });
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/user/user.html"*/'<ion-content>\n    <ion-row>\n        <ion-col class="user-data">\n            <ion-icon class="icon" name="md-person" large></ion-icon>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="title">\n            {{ current_user.username }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            user_id: {{ current_user.user_id }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            Tier: {{ current_user.tier }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            Role: {{ current_user.role }}\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="current_user.email">\n        <ion-col class="user-data">\n            Email: {{ current_user.email }}\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="current_user.tier == \'FREE\'">\n        <ion-col class="user-data-inline">\n            Upgrade to Premium:\n            <ion-item class="selector">\n                <ion-label>\n                    Tier:\n                </ion-label>\n                <ion-select [(ngModel)]="selected_value">\n                    <ion-option *ngFor="let tier of tier_options">{{tier}}</ion-option>\n                </ion-select>\n            </ion-item>\n            <button class="confirm-btn" (click)="showConfirm()">\n                Confirm\n            </button>\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="current_user.tier != \'FREE\'">\n        <ion-col class="user-data">\n            <button class="confirm-btn" (click)="showCancelConfirm()">\n                Cancel Subscription\n            </button>\n        </ion-col>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/user/user.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_tier_service__["a" /* TierService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TierService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TierService = (function () {
    function TierService(http, endpointService, authService) {
        this.http = http;
        this.endpointService = endpointService;
        this.authService = authService;
        this.url = this.endpointService.base + '/api/t';
    }
    TierService.prototype.listTiers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            var apiUrl = _this.url;
            _this.http.get(apiUrl, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    TierService.prototype.putTier = function (tier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            // the url is a bit different here
            var me_url = _this.endpointService.base + '/api/me/t';
            var tier_object = { "tier": tier };
            _this.http.put(me_url, tier_object, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    TierService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    TierService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]])
    ], TierService);
    return TierService;
}());

//# sourceMappingURL=tier.service.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fund_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__following_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__prediction_service__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__security_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__holding_service__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tier_service__ = __webpack_require__(186);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_0__user_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__fund_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__endpoint_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__following_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__prediction_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__security_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__holding_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__tier_service__["a"]; });










//# sourceMappingURL=main.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PredictionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PredictionService = (function () {
    function PredictionService(http, endpointService, authService) {
        this.http = http;
        this.endpointService = endpointService;
        this.authService = authService;
        this.url = this.endpointService.base + '/api/f';
    }
    PredictionService.prototype.getPredictions = function (fund_id, page_number) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + fund_id + '/p/?page=' + page_number + '&size=1', options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    PredictionService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    PredictionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]])
    ], PredictionService);
    return PredictionService;
}());

//# sourceMappingURL=prediction.service.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnboardingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OnboardingPage = (function () {
    function OnboardingPage(loadingCtrl, authService, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slides = [
            {
                title: "Invest Smarter, Not Harder",
                description: "Make a strategy like a mutual fund by getting <b>predictions</b> on their holdings.",
                image: "../../assets/img/piggy@3x.svg",
            },
            {
                title: "Get Reports With Predictions",
                description: "Stack reports give you a prediction on what stocks or other investments were bought or sold by a Mutual Fund.",
                image: "../../assets/img/reports@3x.svg",
            },
            {
                title: "3 Free Stack Reports Per Quarter",
                description: "The first three Stack Reports are on us! With Stack Report Gold a user can gain access to 10 reports or more every quarter.",
                image: "../../assets/img/gold@3x.svg",
            }
        ];
    }
    OnboardingPage.prototype.continue = function () {
        this.showLoading();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
    };
    OnboardingPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OnboardingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/onboarding/onboarding.html"*/'\n<ion-header>\n    <ion-navbar>\n      <ion-title>Welcome to the Stack Report!</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content class="tutorial-page">\n    <ion-slides pager>\n      <ion-slide *ngFor="let slide of slides">\n        <ion-toolbar>\n          <ion-buttons end>\n            <button (click)="continue()" ion-button color="primary">Skip</button>\n          </ion-buttons>\n        </ion-toolbar>\n        <img [src]="slide.image" class="slide-image"/>\n        <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n        <p [innerHTML]="slide.description"></p>\n      </ion-slide>\n      <ion-slide>\n        <ion-toolbar>\n        </ion-toolbar>\n        <img src="../../assets/img/piggy@3x.svg" class="slide-image"/>\n        <h2 class="slide-title">Ready to Invest Smarter?</h2>\n        <button ion-button large clear icon-end color="primary" (click)="continue()">\n          Continue\n          <ion-icon name="arrow-forward"></ion-icon>\n        </button>\n      </ion-slide>\n    </ion-slides>\n  </ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/onboarding/onboarding.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], OnboardingPage);
    return OnboardingPage;
}());

//# sourceMappingURL=onboarding.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EndpointService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EndpointService = (function () {
    function EndpointService() {
        var fvariable = true;
        if (fvariable) {
            this.base = 'https://stackreport.io';
        }
        else {
            this.base = 'http://localhost:8000';
        }
        this.fund = '/api/f';
        this.user = '/api/u';
        this.me = '/api/me';
        this.prediction = '/api/p';
        this.auth = '/api/auth';
    }
    EndpointService.prototype.getUser = function () {
        return this.user;
    };
    EndpointService.prototype.getBase = function () {
        return this.base;
    };
    EndpointService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], EndpointService);
    return EndpointService;
}());

//# sourceMappingURL=endpoint.service.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(383);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FundService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_security__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_holding_model__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FundService = (function () {
    function FundService(http, endpointService, authService) {
        this.http = http;
        this.endpointService = endpointService;
        this.authService = authService;
        this.url = this.endpointService.base + '/api/f';
    }
    FundService.prototype.listFunds = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            var apiUrl = _this.url + "?size=1000";
            _this.http.get(apiUrl, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                var idList = [];
                for (var i in resJson.data) {
                    idList.push(resJson.data[i]['fund_id']);
                }
                var toReturn = { 'idList': idList };
                return resolve(toReturn);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FundService.prototype.getFund = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + fund_id, options).toPromise()
                .then(function (res) {
                var data = _this.extractData(res);
                var fund_to_return = new __WEBPACK_IMPORTED_MODULE_5__models_security__["a" /* Fund */](data.fund_id, data.fund_name, data.current_price, data.volume_traded, data.price_history, data.holdings);
                return resolve(fund_to_return);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FundService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        // alphavantage data parsing
        var price_history = [];
        for (var i_1 in body.price_history) {
            price_history.push({
                "date": body.price_history[i_1]["date"],
                "price": body.price_history[i_1]["4. close"]
            });
        }
        var current_price = -1, volume_traded = -1;
        if (price_history.length > 0) {
            current_price = price_history[0]['price'];
            volume_traded = body.price_history[0]["5. volume"];
        }
        var holdings = [];
        for (var i = 0; i < body.holdings.length; i += 1) {
            holdings[i] = new __WEBPACK_IMPORTED_MODULE_6__models_holding_model__["b" /* HoldingMeta */](body.holdings[i].security_id, body.holdings[i].num_shares);
        }
        return {
            "fund_id": body.fund_id,
            "fund_name": body.fund_name,
            "holdings": holdings,
            "price_history": price_history,
            "current_price": current_price,
            "volume_traded": volume_traded,
        };
    };
    FundService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    FundService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */],
            __WEBPACK_IMPORTED_MODULE_7__auth_service__["a" /* AuthService */]])
    ], FundService);
    return FundService;
}());

//# sourceMappingURL=fund.service.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_restapi_restapi__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_main__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_charts__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_main__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_main__ = __webpack_require__(499);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["k" /* RootPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["n" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["d" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["h" /* OnboardingPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["i" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["m" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["f" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["l" /* SecurityPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["c" /* AllFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["b" /* AddFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["e" /* InvestmentsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["j" /* ReportsPage */],
                __WEBPACK_IMPORTED_MODULE_13__components_main__["a" /* PreviewComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_main__["b" /* SecurityGraphComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["g" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/investments/investments.module#InvestmentsPageModule', name: 'InvestmentsPage', segment: 'investments', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reports/reports.module#ReportsPageModule', name: 'ReportsPage', segment: 'reports', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/root/root.module#RootPageModule', name: 'RootPage', segment: 'root', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ng2_charts__["ChartsModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["k" /* RootPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["n" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["d" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["i" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["m" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["f" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["h" /* OnboardingPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["l" /* SecurityPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["c" /* AllFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["b" /* AddFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["g" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["j" /* ReportsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["e" /* InvestmentsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__services_main__["i" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["d" /* FundService */],
                __WEBPACK_IMPORTED_MODULE_8__providers_restapi_restapi__["a" /* RestapiProvider */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["b" /* EndpointService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["c" /* FollowingService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["f" /* PredictionService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["g" /* SecurityService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["e" /* HoldingService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["h" /* TierService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(http, endpointService) {
        this.http = http;
        this.endpointService = endpointService;
        this.url = this.endpointService.base + '/api/u/';
    }
    UserService.prototype.getUsers = function (page, size) {
        var _this = this;
        if (page === void 0) { page = 0; }
        if (size === void 0) { size = 10; }
        return new Promise(function (resolve, reject) {
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
                params: {
                    page: page,
                    size: size
                }
            });
            console.log("this.url");
            console.log(_this.url);
            _this.http.get(_this.url, options).toPromise()
                .then(function (res) {
                return resolve(_this.extractData(res));
            })
                .catch(_this.handleErrorPromise);
        });
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || [];
    };
    UserService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__main__["d" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__main__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__main__["n" /* UserPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Users" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Test" tabIcon="test"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllFundsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_following_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fund_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllFundsPage = (function () {
    function AllFundsPage(loadingCtrl, navCtrl, navParams, menuCtrl, followService, fundService, authService, applicationRef) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.applicationRef = applicationRef;
        this.fundList = [];
        this.user = this.authService.user;
    }
    AllFundsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.fundService.listFunds()
            .then(function (fund_meta_list) {
            var promiseList = [];
            fund_meta_list.idList.forEach(function (fund) {
                promiseList.push(new Promise(function (resolve, reject) {
                    _this.fundService.getFund(fund)
                        .then(function (currentFund) {
                        return resolve(currentFund);
                    })
                        .catch(function (err) { return reject(err); });
                }));
            });
            return Promise.all(promiseList);
        })
            .then(function (fund_list) {
            _this.fundList = fund_list;
            _this.applicationRef.tick();
            _this.loading.dismiss();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    AllFundsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    AllFundsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-allfunds',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/allfunds/allfunds.html"*/'<ion-content padding>\n    <ion-row>\n    	<div class="title">\n        	Offered Funds\n    	</div>\n	</ion-row>\n\n	<ion-scroll scrollY = "true" zooming = "true" direction = "xy" class = "scroll">\n		<ion-row class="previewlist">\n			<ion-row class="preview" *ngFor="let fund of fundList">\n				<component-preview *ngIf="fund" [security_in] = "fund">\n				</component-preview>\n			</ion-row>\n		</ion-row>\n	</ion-scroll>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/allfunds/allfunds.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_4__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], AllFundsPage);
    return AllFundsPage;
}());

//# sourceMappingURL=allfunds.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFundsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_following_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fund_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddFundsPage = (function () {
    function AddFundsPage(loadingCtrl, navCtrl, navParams, menuCtrl, followService, fundService, authService, applicationRef) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.applicationRef = applicationRef;
        this.fundList = [];
        this.requestList = [];
        this.user = this.authService.user;
    }
    AddFundsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.fundService.listFunds()
            .then(function (fund_meta_list) {
            var promiseList = [];
            fund_meta_list.forEach(function (fund) {
                promiseList.push(new Promise(function (resolve, reject) {
                    _this.fundService.getFund(fund)
                        .then(function (currentFund) {
                        return resolve(currentFund);
                    })
                        .catch(function (err) { return reject(err); });
                }));
            });
            return Promise.all(promiseList);
        })
            .then(function (fund_list) {
            _this.fundList = fund_list;
            console.log(_this.fundList);
            _this.applicationRef.tick();
            _this.loading.dismiss();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    AddFundsPage.prototype.checkFollowing = function (fund_id) {
        if (this.requestList && this.requestList.indexOf(fund_id) != -1) {
            return true;
        }
        else {
            return false;
        }
    };
    AddFundsPage.prototype.postFollow = function (fund_id) {
        // IMPORTANT! This 3 number is hard coded in and should be based upon the user's actual subscription eventually.
        if (this.requestList && this.requestList.length >= 3) {
            alert('You\'ve already selected 3 funds. Please unfollow one before you choose another.');
            return;
        }
        this.requestList.push(fund_id);
    };
    AddFundsPage.prototype.removeFollow = function (fund_id) {
        var i = this.requestList.indexOf(fund_id);
        if (i != -1) {
            this.requestList.splice(i, 1);
        }
    };
    AddFundsPage.prototype.submitFollows = function () {
        for (var i in this.requestList) {
            this.followService.insertFollow(this.requestList[i])
                .then(function (status) {
            })
                .catch(function (err) {
                console.log(err);
            });
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    AddFundsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    AddFundsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-addfunds',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/addfunds/addfunds.html"*/'<ion-content class="topFund-content" padding>\n    <ion-row>\n    	<div class="title">\n        	Choose Funds to Follow...\n    	</div>\n	</ion-row>\n	<ion-row class="previewlist">\n		<ion-row class="preview" *ngFor="let fund of fundList">\n			<div class="previewWrapper">\n				<component-preview *ngIf="fund" [security_in] = "fund">\n				</component-preview>\n			</div>\n		    	<button *ngIf="!checkFollowing(fund.id)" ion-button class="follow-btn" id = "follow-btn" (click)="postFollow(fund.id)">\n		    		Follow\n		    		<ion-icon name="md-add-circle" id="follow-icon" class = "follow-icon"></ion-icon> \n		    	</button>\n		    	<button *ngIf="checkFollowing(fund.id)" ion-button class="unfollow-btn" id = "unfollow-btn" (click)="removeFollow(fund.id)">\n		    		Following\n		    		<ion-icon name="md-remove-circle" id="unfollow-icon" class = "unfollow-icon"></ion-icon> \n		    	</button>\n		</ion-row>\n	</ion-row>\n	<ion-row>\n		<button ion-button class="submit-btn" (click)="submitFollows()">\n			Submit\n		</button>\n	</ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/addfunds/addfunds.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_4__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], AddFundsPage);
    return AddFundsPage;
}());

//# sourceMappingURL=addfunds.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_root_root__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authService) {
        this.authService = authService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_root_root__["a" /* RootPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestapiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestapiProvider = (function () {
    function RestapiProvider(http, endpointService, alertController) {
        this.http = http;
        this.endpointService = endpointService;
        this.alertController = alertController;
        console.log('Hello RestapiProvider Provider');
    }
    RestapiProvider.prototype.Login = function (loginCredentials) {
        var _this = this;
        console.log('Logging In');
        console.log(loginCredentials);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.endpointService.base + _this.endpointService.auth, loginCredentials, { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (data) {
                console.log('provider getting data');
                resolve(data);
            }, function (err) {
                alert('Invalid credentials. Try again.');
                location.reload();
                resolve(new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]({ 'empty': 'true' }));
            });
        });
    };
    RestapiProvider.prototype.getUser = function (token) {
        var _this = this;
        console.log('checking token');
        console.log(token);
        return new Promise(function (resolve) {
            _this.http.get(_this.endpointService.base + _this.endpointService.me, { headers: { 'Authorization': token } }).subscribe(function (data) {
                console.log('provider getting user');
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestapiProvider.prototype.CreateAccount = function (registerCredentials) {
        var _this = this;
        console.log('Creating Account');
        return new Promise(function (resolve) {
            _this.http.post(_this.endpointService.base + _this.endpointService.user, registerCredentials, { headers: { 'Content-Type': 'application/json' } })
                .subscribe(function (data) {
                console.log('provider getting data');
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestapiProvider.prototype.getData = function () {
        var _this = this;
        console.log('getting data <<<');
        return new Promise(function (resolve) {
            _this.http.get(_this.endpointService.base + _this.endpointService.fund)
                .subscribe(function (data) {
                console.log('provider getting data');
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    RestapiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__services_endpoint_service__["a" /* EndpointService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]])
    ], RestapiProvider);
    return RestapiProvider;
}());

//# sourceMappingURL=restapi.js.map

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 239,
	"./af.js": 239,
	"./ar": 240,
	"./ar-dz": 241,
	"./ar-dz.js": 241,
	"./ar-kw": 242,
	"./ar-kw.js": 242,
	"./ar-ly": 243,
	"./ar-ly.js": 243,
	"./ar-ma": 244,
	"./ar-ma.js": 244,
	"./ar-sa": 245,
	"./ar-sa.js": 245,
	"./ar-tn": 246,
	"./ar-tn.js": 246,
	"./ar.js": 240,
	"./az": 247,
	"./az.js": 247,
	"./be": 248,
	"./be.js": 248,
	"./bg": 249,
	"./bg.js": 249,
	"./bm": 250,
	"./bm.js": 250,
	"./bn": 251,
	"./bn.js": 251,
	"./bo": 252,
	"./bo.js": 252,
	"./br": 253,
	"./br.js": 253,
	"./bs": 254,
	"./bs.js": 254,
	"./ca": 255,
	"./ca.js": 255,
	"./cs": 256,
	"./cs.js": 256,
	"./cv": 257,
	"./cv.js": 257,
	"./cy": 258,
	"./cy.js": 258,
	"./da": 259,
	"./da.js": 259,
	"./de": 260,
	"./de-at": 261,
	"./de-at.js": 261,
	"./de-ch": 262,
	"./de-ch.js": 262,
	"./de.js": 260,
	"./dv": 263,
	"./dv.js": 263,
	"./el": 264,
	"./el.js": 264,
	"./en-au": 265,
	"./en-au.js": 265,
	"./en-ca": 266,
	"./en-ca.js": 266,
	"./en-gb": 267,
	"./en-gb.js": 267,
	"./en-ie": 268,
	"./en-ie.js": 268,
	"./en-il": 269,
	"./en-il.js": 269,
	"./en-nz": 270,
	"./en-nz.js": 270,
	"./eo": 271,
	"./eo.js": 271,
	"./es": 272,
	"./es-do": 273,
	"./es-do.js": 273,
	"./es-us": 274,
	"./es-us.js": 274,
	"./es.js": 272,
	"./et": 275,
	"./et.js": 275,
	"./eu": 276,
	"./eu.js": 276,
	"./fa": 277,
	"./fa.js": 277,
	"./fi": 278,
	"./fi.js": 278,
	"./fo": 279,
	"./fo.js": 279,
	"./fr": 280,
	"./fr-ca": 281,
	"./fr-ca.js": 281,
	"./fr-ch": 282,
	"./fr-ch.js": 282,
	"./fr.js": 280,
	"./fy": 283,
	"./fy.js": 283,
	"./gd": 284,
	"./gd.js": 284,
	"./gl": 285,
	"./gl.js": 285,
	"./gom-latn": 286,
	"./gom-latn.js": 286,
	"./gu": 287,
	"./gu.js": 287,
	"./he": 288,
	"./he.js": 288,
	"./hi": 289,
	"./hi.js": 289,
	"./hr": 290,
	"./hr.js": 290,
	"./hu": 291,
	"./hu.js": 291,
	"./hy-am": 292,
	"./hy-am.js": 292,
	"./id": 293,
	"./id.js": 293,
	"./is": 294,
	"./is.js": 294,
	"./it": 295,
	"./it.js": 295,
	"./ja": 296,
	"./ja.js": 296,
	"./jv": 297,
	"./jv.js": 297,
	"./ka": 298,
	"./ka.js": 298,
	"./kk": 299,
	"./kk.js": 299,
	"./km": 300,
	"./km.js": 300,
	"./kn": 301,
	"./kn.js": 301,
	"./ko": 302,
	"./ko.js": 302,
	"./ky": 303,
	"./ky.js": 303,
	"./lb": 304,
	"./lb.js": 304,
	"./lo": 305,
	"./lo.js": 305,
	"./lt": 306,
	"./lt.js": 306,
	"./lv": 307,
	"./lv.js": 307,
	"./me": 308,
	"./me.js": 308,
	"./mi": 309,
	"./mi.js": 309,
	"./mk": 310,
	"./mk.js": 310,
	"./ml": 311,
	"./ml.js": 311,
	"./mr": 312,
	"./mr.js": 312,
	"./ms": 313,
	"./ms-my": 314,
	"./ms-my.js": 314,
	"./ms.js": 313,
	"./mt": 315,
	"./mt.js": 315,
	"./my": 316,
	"./my.js": 316,
	"./nb": 317,
	"./nb.js": 317,
	"./ne": 318,
	"./ne.js": 318,
	"./nl": 319,
	"./nl-be": 320,
	"./nl-be.js": 320,
	"./nl.js": 319,
	"./nn": 321,
	"./nn.js": 321,
	"./pa-in": 322,
	"./pa-in.js": 322,
	"./pl": 323,
	"./pl.js": 323,
	"./pt": 324,
	"./pt-br": 325,
	"./pt-br.js": 325,
	"./pt.js": 324,
	"./ro": 326,
	"./ro.js": 326,
	"./ru": 327,
	"./ru.js": 327,
	"./sd": 328,
	"./sd.js": 328,
	"./se": 329,
	"./se.js": 329,
	"./si": 330,
	"./si.js": 330,
	"./sk": 331,
	"./sk.js": 331,
	"./sl": 332,
	"./sl.js": 332,
	"./sq": 333,
	"./sq.js": 333,
	"./sr": 334,
	"./sr-cyrl": 335,
	"./sr-cyrl.js": 335,
	"./sr.js": 334,
	"./ss": 336,
	"./ss.js": 336,
	"./sv": 337,
	"./sv.js": 337,
	"./sw": 338,
	"./sw.js": 338,
	"./ta": 339,
	"./ta.js": 339,
	"./te": 340,
	"./te.js": 340,
	"./tet": 341,
	"./tet.js": 341,
	"./tg": 342,
	"./tg.js": 342,
	"./th": 343,
	"./th.js": 343,
	"./tl-ph": 344,
	"./tl-ph.js": 344,
	"./tlh": 345,
	"./tlh.js": 345,
	"./tr": 346,
	"./tr.js": 346,
	"./tzl": 347,
	"./tzl.js": 347,
	"./tzm": 348,
	"./tzm-latn": 349,
	"./tzm-latn.js": 349,
	"./tzm.js": 348,
	"./ug-cn": 350,
	"./ug-cn.js": 350,
	"./uk": 351,
	"./uk.js": 351,
	"./ur": 352,
	"./ur.js": 352,
	"./uz": 353,
	"./uz-latn": 354,
	"./uz-latn.js": 354,
	"./uz.js": 353,
	"./vi": 355,
	"./vi.js": 355,
	"./x-pseudo": 356,
	"./x-pseudo.js": 356,
	"./yo": 357,
	"./yo.js": 357,
	"./zh-cn": 358,
	"./zh-cn.js": 358,
	"./zh-hk": 359,
	"./zh-hk.js": 359,
	"./zh-tw": 360,
	"./zh-tw.js": 360
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 480;

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__preview_preview__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__securityGraph_securityGraph__ = __webpack_require__(501);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__preview_preview__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__securityGraph_securityGraph__["a"]; });



//# sourceMappingURL=main.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_security_security__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PreviewComponent = (function () {
    function PreviewComponent(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.security = null;
        this.price_color = "price white";
    }
    PreviewComponent.prototype.ngOnInit = function () {
        this.security = this.security_from_front;
        if (this.security.price_history.length > 0 &&
            this.security.current_price < this.security.price_history[1]['price']) {
            this.price_color = 'price red';
        }
        else if (this.security.price_history.length > 0 &&
            this.security.current_price > this.security.price_history[1]['price']) {
            this.price_color = 'price green';
        }
    };
    PreviewComponent.prototype.openPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_security_security__["a" /* SecurityPage */], {
            param: this.security
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('security_in'),
        __metadata("design:type", Object)
    ], PreviewComponent.prototype, "security_from_front", void 0);
    PreviewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'component-preview',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/components/preview/preview.html"*/'<div>\n	<button *ngIf="security" ion-button class=\'btn\' (click)="openPage()">\n		<div class=\'wrapper\'>\n			<div class = "leftside">\n				<div class = "ticker">\n					{{security.id || "TEST" | uppercase}}\n				</div>\n				<div class = "name">\n					{{security.name || "TEST"}} \n				</div>\n			</div>\n			<div class = "rightside">\n				<div class = {{price_color}}>\n					{{security.current_price || "99.99" | number : \'1.2-2\'}}\n				</div>\n			</div>\n		</div>\n	</button>\n</div>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/components/preview/preview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], PreviewComponent);
    return PreviewComponent;
}());

//# sourceMappingURL=preview.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityGraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_fund_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_security__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// !!! this code heavily inspired by https://valor-software.com/ng2-charts/ (chart library example)
var SecurityGraphComponent = (function () {
    function SecurityGraphComponent(fundService, applicationRef) {
        this.fundService = fundService;
        this.applicationRef = applicationRef;
        this.lineChartData = [
            { data: [10, 30, 60, 100, 150] },
        ];
        this.lineChartLabels = ['1/1', '1/2', '1/3', '1/4', '1/5'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                lineTension: 0,
                lineWidth: 0.1,
                borderColor: 'rgba(236,50,118,1)',
                pointBackgroundColor: 'rgba(149,86,208,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(149,86,208,0.8)'
            }
        ];
        this.lineChartLegend = false;
        this.lineChartType = 'line';
        //this.fund = new Fund("fund_id");
        this.security = null;
    }
    SecurityGraphComponent.prototype.populateGraph = function () {
        var _this = this;
        // populate graph (last 5 days))
        [0, 1, 2, 3, 4].forEach(function (i) {
            _this.lineChartData[0].data[4 - i] = _this.security.price_history[i]['price'];
            var utcDate = new Date(_this.security.price_history[i]['date']);
            var date = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
            var month = date.getMonth() + 1;
            var formatted = month + "/" + date.getDate();
            _this.lineChartLabels[4 - i] = formatted;
        });
        this.applicationRef.tick();
        console.log("populated");
    };
    SecurityGraphComponent.prototype.ngOnInit = function () {
        this.security = this.security_in;
        this.populateGraph();
        this.applicationRef.tick();
    };
    // events 
    SecurityGraphComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    SecurityGraphComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_security__["b" /* Security */])
    ], SecurityGraphComponent.prototype, "security_in", void 0);
    SecurityGraphComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'component-securitygraph',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/components/securityGraph/securityGraph.html"*/'<div class="row">\n    <div *ngIf="security">\n        <div class="col-md-6">\n            <div style="display: block;">\n            <canvas baseChart width="400" height="200"\n                        [datasets]="lineChartData"\n                        [labels]="lineChartLabels"\n                        [options]="lineChartOptions"\n                        [colors]="lineChartColors"\n                        [legend]="lineChartLegend"\n                        [chartType]="lineChartType"\n                        (chartHover)="chartHovered($event)"\n                        (chartClick)="chartClicked($event)"></canvas>\n            </div>\n        </div>\n    </div>\n</div>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/components/securityGraph/securityGraph.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], SecurityGraphComponent);
    return SecurityGraphComponent;
}());

//# sourceMappingURL=securityGraph.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Security; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fund; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Stock; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Security = (function () {
    function Security(id, name, current_price, volume_traded, price_history) {
        //Required Params
        if (!price_history
            || !name
            || !id
            || !current_price
            || !volume_traded) {
            throw "Missing required field";
        }
        this.id = id;
        this.name = name;
        this.current_price = current_price;
        this.volume_traded = volume_traded;
        this.price_history = price_history;
    }
    return Security;
}());
var Fund = (function (_super) {
    __extends(Fund, _super);
    function Fund(id, name, current_price, volume_traded, price_history, holdings) {
        var _this = _super.call(this, id, name, current_price, volume_traded, price_history) || this;
        _this.holdings = holdings;
        return _this;
    }
    Fund.prototype.setHoldings = function (holdings) {
        var totalPrice = 0;
        holdings.forEach(function (holding) {
            totalPrice += holding.security.current_price * holding.num_shares;
        });
        holdings.forEach(function (holding) {
            holding.setPercent(holding.num_shares * holding.security.current_price / totalPrice * 100);
        });
        this.holdings = holdings;
    };
    return Fund;
}(Security));
var Stock = (function (_super) {
    __extends(Stock, _super);
    function Stock(id, name, current_price, volume_traded, price_history) {
        return _super.call(this, id, name, current_price, volume_traded, price_history) || this;
    }
    return Stock;
}(Security));

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_main__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuPage = (function () {
    function MenuPage(platform, authService, app) {
        this.platform = platform;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__main__["d" /* HomePage */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_3__main__["d" /* HomePage */] },
            { title: 'Offered Funds', component: __WEBPACK_IMPORTED_MODULE_3__main__["c" /* AllFundsPage */] },
            { title: 'My account', component: __WEBPACK_IMPORTED_MODULE_3__main__["n" /* UserPage */] },
        ];
        this.authService = authService;
        this.app = app;
    }
    MenuPage.prototype.back = function () {
        if (this.nav.canGoBack()) {
            this.nav.pop();
        }
    };
    MenuPage.prototype.openPage = function (page) {
        this.nav.push(page.component);
    };
    MenuPage.prototype.logout = function () {
        this.authService.logout();
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__main__["f" /* LoginPage */]);
    };
    // check if the user is on the home page so that the back button can be hidden if needed
    MenuPage.prototype.checkHome = function () {
        var menuBtn = document.getElementsByClassName('menu-btn');
        if (typeof this.nav.last() == "undefined") {
            menuBtn[0].setAttribute("style", "margin-top: -3px");
            return false;
        }
        else if (this.nav.last().component.name == "HomePage") {
            menuBtn[0].setAttribute("style", "margin-top: -3px");
            return false;
        }
        else {
            menuBtn[0].setAttribute("style", "margin-top: -30px");
            return true;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/menu/menu.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar>\n        <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n      \n    <ion-content>\n        <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            {{p.title}}\n        </button>\n        <button ion-item (click)="logout()">\n            Logout\n        </button>\n        </ion-list>\n    </ion-content>\n</ion-menu>\n\n    \n<ion-header id="nav-bar-super">\n    <ion-navbar class="navigation-bar">\n        <ion-buttons left>\n            <button *ngIf="checkHome()" ion-button icon-only start class="button" id="backButton" (click)="back()">\n                <ion-icon name="arrow-back" class="back-btn"></ion-icon>\n            </button>\n            <button ion-button menuToggle start class="menu-btn">\n                <ion-icon name="menu"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title class="title">\n            StackReport\n            <img src="../../assets/img/logo-image-for-login-page.png" class="logo"/>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav class="menu-nav" [root]="rootPage" #content swipeBackEnabled="false">\n</ion-nav>\n\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/menu/menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__services_main__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FollowingService = (function () {
    function FollowingService(http, endpointService, authService) {
        this.http = http;
        this.endpointService = endpointService;
        this.authService = authService;
        this.url = this.endpointService.base + '/api/f';
    }
    FollowingService.prototype.isFollowing = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + fund_id + '/follow', options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson.exists);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FollowingService.prototype.insertFollow = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.post(_this.url + '/' + fund_id + '/follow', {}, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FollowingService.prototype.deleteFollow = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': _this.authService.user.getToken()
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.delete(_this.url + '/' + fund_id + '/follow', options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson.code == 201 ? true : false);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FollowingService.prototype.getAllFollowing = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json',
                'Authorization': _this.authService.token
            });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.endpointService.base + '/api/me/following', options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                var idList = [];
                for (var i in resJson) {
                    idList.push(resJson[i]['fund_id']);
                }
                return resolve(idList);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FollowingService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    FollowingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_service__["a" /* AuthService */]])
    ], FollowingService);
    return FollowingService;
}());

//# sourceMappingURL=following.service.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(loadingCtrl, authService, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginCredentials = { username: '', password: '' };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.createAccount = function () {
        console.log('Navigate to register page.');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.resetLoginPage = function () {
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        /*
        google how to find if ionic is in dev mode
        send post request to localhost:8000/api/auth, production endpoint
        create endpoint service, if dev export localhost endpoint else export production endpoint
        
        */
        this.showLoading();
        console.log('login');
        this.authService.login({ username: this.loginCredentials.username, password: this.loginCredentials.password })
            .then(function (user) {
            if (user && user.username) {
                console.log("Succesful login");
                _this.loading.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
            }
            else {
                _this.loading.dismiss();
                alert("Bad username or password");
            }
        })
            .catch(function (err) {
            console.log("HERE2");
            console.log(err);
            _this.loading.dismiss();
            alert(err);
            location.reload();
        });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    	<h1 id = "StackReportTitle"> StackReport! </h1>\n      	<img id = "logo" src="../../assets/img/logo-image-for-login-page.png"/>\n      	<h2 id = "SignInHeader"> Sign in! </h2>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form (ngSubmit)="login()" #registerForm="ngForm">      \n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="loginCredentials.username" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="loginCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n        </ion-col>\n      </ion-row>\n    </form>          \n    <button ion-button class="register-btn" block clear (click)="createAccount()">New user? Create an account.</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_security__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_investments_investments__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_reports_reports__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_following_service__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SecurityPage = (function () {
    function SecurityPage(navCtrl, navParams, followService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.followService = followService;
        this.alertCtrl = alertCtrl;
        this.security = null;
        this.follow_status = false;
    }
    SecurityPage.prototype.ngOnInit = function () {
        this.security = this.navParams.get('param');
        this.volume_traded = this.security.volume_traded;
        // this will remove the investments and reports buttons if the security is a stock
        if (this.security instanceof __WEBPACK_IMPORTED_MODULE_2__models_security__["c" /* Stock */]) {
            this.is_stock = true;
        }
        else {
            this.is_stock = false;
        }
        if (!this.is_stock) {
            this.checkFollowing();
        }
    };
    SecurityPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Follow this fund?',
            message: 'Are you sure you want to follow this fund? Doing so will allow you to follow one fewer fund for this quarter.',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.postFollow();
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    SecurityPage.prototype.openInvestmentsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_investments_investments__["a" /* InvestmentsPage */], {
            param: this.security
        });
    };
    SecurityPage.prototype.openReportsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_reports_reports__["a" /* ReportsPage */], {
            param: this.security
        });
    };
    SecurityPage.prototype.checkFollowing = function () {
        var _this = this;
        this.followService.isFollowing(this.security.id)
            .then(function (is_following) {
            _this.follow_status = is_following;
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    SecurityPage.prototype.postFollow = function () {
        var _this = this;
        this.followService.insertFollow(this.security.id)
            .then(function (status) {
            if (status) {
                _this.follow_status = true;
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    SecurityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-security',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/security/security.html"*/'<ion-content class="security-content" padding>\n    <ion-row class=\'fund-name\'>\n        {{security.name || "TEST"}} ({{security.id || "TEST" | uppercase}})\n    </ion-row>\n    <ion-row *ngIf="!is_stock">\n    	<button *ngIf="!follow_status" ion-button class="follow-btn" id = "follow-btn" (click)="showConfirm()">\n    		Follow\n    		<ion-icon name="md-add-circle" id="follow-icon" class = "follow-icon"></ion-icon> \n    	</button>\n	</ion-row>\n    <ion-row class=\'info-label\'>\n    	Current Share Price\n	</ion-row>\n	<ion-row class=\'info-value\'>\n		${{security.current_price || "99.99" | number : \'1.2-2\'}}\n	</ion-row>\n	<ion-row class=\'info-label\'>\n    	Volume Traded\n	</ion-row>\n	<ion-row class=\'info-value\'>\n		{{volume_traded || "1000000" | number : \'1.0-0\'}}\n	</ion-row>\n	<ion-row class=\'fund-graph\' *ngIf="security && security.price_history && security.price_history[0]">\n		<div class="graph-wrapper">\n			<component-securitygraph [security_in]="security">\n			</component-securitygraph>\n		</div>\n	</ion-row>\n	<ion-row *ngIf="!is_stock" id = "investments-btn-row">\n        <button ion-button class="investments-btn" (click)="openInvestmentsPage()">Investments</button>\n    </ion-row>\n    <ion-row *ngIf="!is_stock" id = "reports-btn-row">\n        <button ion-button class="reports-btn" (click)="openReportsPage()">Reports</button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/security/security.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SecurityPage);
    return SecurityPage;
}());

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__root_root__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__security_security__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__allfunds_allfunds__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__addfunds_addfunds__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__menu_menu__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__reports_reports__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__investments_investments__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__onboarding_onboarding__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_6__root_root__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__home_home__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_2__user_user__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__login_login__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_5__register_register__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_7__security_security__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8__allfunds_allfunds__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_9__addfunds_addfunds__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_10__menu_menu__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_12__investments_investments__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_11__reports_reports__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_13__onboarding_onboarding__["a"]; });















//# sourceMappingURL=main.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_following_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fund_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, navParams, menuCtrl, followService, fundService, authService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.fundList = [];
        this.user = authService.user;
        this.showLoading();
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.followService.getAllFollowing()
            .then(function (fund_meta_list) {
            var promiseList = [];
            fund_meta_list.forEach(function (fund) {
                promiseList.push(new Promise(function (resolve, reject) {
                    _this.fundService.getFund(fund)
                        .then(function (currentFund) {
                        return resolve(currentFund);
                    })
                        .catch(function (err) { return reject(err); });
                }));
            });
            return Promise.all(promiseList);
        })
            .then(function (fund_list) {
            _this.fundList = fund_list;
            _this.loading.dismiss();
        })
            .catch(function (err) {
            _this.loading.dismiss();
            console.log(err);
        });
    };
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading Watchlist...',
        });
        this.loading.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/home/home.html"*/'<ion-content class="page-home">\n    <div classs="page-content">\n        <ion-row>\n            <div class = "watching">\n                Watching\n            </div>\n        </ion-row>\n        <ion-row class="previewlist">\n            <ion-row class="preview" *ngFor="let fund of fundList">\n                <component-preview *ngIf="fund" [security_in] = "fund">\n                </component-preview>\n            </ion-row>\n        </ion-row>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_4__services_fund_service__["a" /* FundService */],
            __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[361]);
//# sourceMappingURL=main.js.map