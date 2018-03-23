webpackJsonp([5],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__topfunds_topfunds__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__regionalfunds_regionalfunds__ = __webpack_require__(64);
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
    function UserPage(navCtrl, navParams, authService, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.current_user = authService.getLoggedInUser();
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
    UserPage.prototype.navToTopFunds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__topfunds_topfunds__["a" /* TopFundsPage */]);
    };
    UserPage.prototype.navToByRegionPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__regionalfunds_regionalfunds__["a" /* RegionalfundsPage */]);
    };
    UserPage.prototype.navUserInfo = function () {
        this.menuCtrl.toggle();
    };
    UserPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    UserPage.prototype.navPortfolioPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/user/user.html"*/'<ion-content>\n    <ion-row>\n        <ion-col class="user-data">\n            <ion-icon class="icon" name="md-person" large></ion-icon>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="title">\n            {{ current_user.username }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            user_id: {{ current_user.user_id }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            Tier: {{ current_user.tier }}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="user-data">\n            Role: {{ current_user.role }}\n        </ion-col>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/user/user.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvestmentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_fund_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_security_service__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(20);
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
    function InvestmentsPage(navCtrl, navParams, fundService, authService, menuCtrl, securityService, applicationRef, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fundService = fundService;
        this.authService = authService;
        this.menuCtrl = menuCtrl;
        this.securityService = securityService;
        this.applicationRef = applicationRef;
        this.loadingCtrl = loadingCtrl;
        this.user = this.authService.getLoggedInUser();
    }
    InvestmentsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.security = this.navParams.get('param');
        this.totalPrice = 0;
        var promiseList = [];
        this.security.holdings.forEach(function (holding) {
            promiseList.push(new Promise(function (resolve, reject) {
                _this.securityService.get(holding.security_id)
                    .then(function (holdingRes) {
                    return resolve(holdingRes);
                })
                    .catch(function (err) { return reject(err); });
            }));
        });
        Promise.all(promiseList)
            .then(function (securities) {
            var i = 0;
            securities.forEach(function (security) {
                if (!security.price_history || !security.price_history[0]) {
                    _this.security.holdings[i]['current_price'] = -1;
                    return;
                }
                var current_price = parseFloat(security.price_history[0]["4. close"]);
                _this.totalPrice += current_price * _this.security.holdings[i]['num_shares'];
                _this.security.holdings[i]['current_price'] = current_price;
                i += 1;
            });
            _this.loading.dismiss();
            _this.applicationRef.tick();
        })
            .catch(function (err) {
            _this.loading.dismiss();
            console.log(err);
        });
    };
    InvestmentsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    InvestmentsPage.prototype.openStockPage = function (stock_id) {
        this.securityService.get(stock_id)
            .then(function (securityRes) {
            console.log(securityRes);
            // this.navCtrl.push(SecurityPage, {
            // 	param: this.security
            // });
        });
    };
    InvestmentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-investments',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/investments/investments.html"*/'<ion-content class="investments-content">\n    <ion-row class=\'fund-name\'>\n        {{security.name || "TEST"}} ({{security.id || "TEST" | uppercase}})\n    </ion-row>\n    <div class = \'table\'>\n        <div class="row header">\n          <div class="col">Ticker</div>\n          <div class="col" style=\'text-align: right;\'>Current Price</div>\n          <div class="col" style=\'text-align: right;\'>Shares Held</div>\n          <div class="col" style=\'text-align: right;\'>Percent</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let holding of security.holdings">\n            <div class="row" (click)="openStockPage(holding.id)">\n              <div class="col">{{holding.security_id}}</div>\n              <div class="col" style=\'text-align: right;\'>${{holding.current_price}}</div>\n              <div class="col" style=\'text-align: right;\'>{{holding.num_shares}}</div>\n              <div class="col" style=\'text-align: right;\'>{{(holding.current_price*holding.num_shares)/totalPrice * 100 | number : \'1.2-2\'}}%</div>\n            </div>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/investments/investments.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__services_fund_service__["a" /* FundService */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__services_security_service__["a" /* SecurityService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */]])
    ], InvestmentsPage);
    return InvestmentsPage;
}());

//# sourceMappingURL=investments.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_restapi_restapi__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
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
    function RegisterPage(navCtrl, navParams, loadingCtrl, restapiProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.restapiProvider = restapiProvider;
        this.registerCredentials = { username: '', password: '', confirm: '' };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        console.log('Register');
        this.showLoading();
        console.log(this.restapiProvider.CreateAccount({ username: this.registerCredentials.username, password: this.registerCredentials.password }));
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    RegisterPage.prototype.anothetFunction = function () {
        console.log('a');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/register/register.html"*/'<ion-content class="register-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    	<h1 id = "StackReportTitle"> StackReport! </h1>\n      	<img id = "logo" src="../../assets/img/logo-image-for-login-page.png"/>\n      	<h2 id = "SignInHeader"> Sign in! </h2>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="register-box">\n    <form (ngSubmit)="register()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="registerCredentials.username" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Confirm Password" name="confirm" [(ngModel)]="registerCredentials.confirm" required></ion-input>\n            </ion-item>\n                        \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Register Account</button>\n        </ion-col>\n      </ion-row>\n    </form>          \n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__providers_restapi_restapi__["a" /* RestapiProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RootPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(20);
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
    }
    RootPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RootPage');
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

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fund_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__topfunds_topfunds__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__regionalfunds_regionalfunds__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_user__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_prediction_service__ = __webpack_require__(186);
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
        this.user = authService.getLoggedInUser();
        this.buyPredictions = [];
        this.sellPredictions = [];
        this.lastUpdated = "1/1/2000";
    }
    ReportsPage.prototype.ngOnInit = function () {
        this.security = this.navParams.get('param');
        this.getPredictions();
    };
    ReportsPage.prototype.getPredictions = function () {
        var _this = this;
        this.predictionService.getPredictions(this.security.id)
            .then(function (predictionList) {
            console.log(predictionList);
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
    ReportsPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    ReportsPage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    ReportsPage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    ReportsPage.prototype.navToTopFunds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__topfunds_topfunds__["a" /* TopFundsPage */]);
    };
    ReportsPage.prototype.navToByRegionPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__regionalfunds_regionalfunds__["a" /* RegionalfundsPage */]);
    };
    ReportsPage.prototype.navUserInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__user_user__["a" /* UserPage */]);
    };
    ReportsPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
    };
    ReportsPage.prototype.navPortfolioPage = function () {
        this.menuCtrl.toggle();
    };
    ReportsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reports',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/reports/reports.html"*/'<ion-content class="reports-content" padding>	\n    <ion-row class=\'fund-name\'>\n        {{security.name || "TEST"}} ({{security.id || "TEST" | uppercase}})\n    </ion-row>\n    <ion-row class = "label">\n    	Buys\n    </ion-row>\n    <table class = \'table\'>\n        <div class="row header">\n          <div class="col top">Name</div>\n          <div class="col top" style=\'text-align: right;\'>Amount</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let buyPred of buyPredictions">\n            <div class="row">\n              <div class="col">{{buyPred.security_id | uppercase}}</div>\n              <div class="col" style=\'text-align: right;\'>{{buyPred.amount}}</div>\n            </div>\n        </div>\n    </table>\n    <ion-row class = "label">\n    	Sells\n	</ion-row>\n	<table class = \'table\'>\n        <div class="row header">\n          <div class="col top">Ticker</div>\n          <div class="col top" style=\'text-align: right;\'>Amount</div>\n        </div>\n        <hr class=\'line\'>\n        <div *ngFor="let sellPred of sellPredictions">\n            <div class="row">\n              <div class="col">{{sellPred.security_id | uppercase}}</div>\n              <div class="col" style=\'text-align: right;\'>{{sellPred.amount}}</div>\n            </div>\n        </div>\n    </table>\n    <ion-row class=\'last-update\'>\n    	Last Update: {{lastUpdated | date:\'short\'}}\n	</ion-row>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/reports/reports.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_8__services_prediction_service__["a" /* PredictionService */]])
    ], ReportsPage);
    return ReportsPage;
}());

//# sourceMappingURL=reports.js.map

/***/ }),

/***/ 138:
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
webpackEmptyAsyncContext.id = 138;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/investments/investments.module": [
		498,
		4
	],
	"../pages/login/login.module": [
		499,
		3
	],
	"../pages/register/register.module": [
		500,
		2
	],
	"../pages/reports/reports.module": [
		501,
		1
	],
	"../pages/root/root.module": [
		502,
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
webpackAsyncContext.id = 181;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Security */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fund; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Stock; });
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
    function Security(id, name, price_history) {
        //Required Params
        if (!price_history
            || !name
            || !id) {
            throw "Missing required field";
        }
        this.id = id;
        this.name = name;
        this.price_history = price_history;
        if (price_history && price_history != undefined && price_history.length > 0) {
            this.current_price = this.price_history[0]['4. close'];
        }
        else {
            this.current_price = 0;
        }
    }
    return Security;
}());
var Fund = (function (_super) {
    __extends(Fund, _super);
    function Fund(id, name, price_history) {
        return _super.call(this, id, name, price_history) || this;
        // this.holdings = holdings;
    }
    Fund.prototype.setHoldings = function (holdings) {
        this.holdings = holdings;
    };
    return Fund;
}(Security));
var Stock = (function (_super) {
    __extends(Stock, _super);
    function Stock(id, name, price_history) {
        return _super.call(this, id, name, price_history) || this;
    }
    return Stock;
}(Security));

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { Security } from '../models/security';
var SecurityService = (function () {
    function SecurityService(http, endpointService) {
        this.http = http;
        this.endpointService = endpointService;
        this.url = this.endpointService.base + '/api/security/';
    }
    SecurityService.prototype.get = function (security_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + security_id, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                return resolve(resJson);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    SecurityService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    SecurityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */]])
    ], SecurityService);
    return SecurityService;
}());

//# sourceMappingURL=security.service.js.map

/***/ }),

/***/ 184:
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
    return User;
}());

;
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_service__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fund_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__endpoint_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__following_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__prediction_service__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__security_service__ = __webpack_require__(183);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__user_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__fund_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__endpoint_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__following_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__prediction_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__security_service__["a"]; });








//# sourceMappingURL=main.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PredictionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(42);
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
    function PredictionService(http, endpointService) {
        this.http = http;
        this.endpointService = endpointService;
        this.url = this.endpointService.base + '/api/f';
    }
    PredictionService.prototype.getPredictions = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + fund_id + '/p/', options).toPromise()
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */]])
    ], PredictionService);
    return PredictionService;
}());

//# sourceMappingURL=prediction.service.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__topfunds_topfunds__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__regionalfunds_regionalfunds__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_following_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_fund_service__ = __webpack_require__(37);
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
    function HomePage(navCtrl, navParams, menuCtrl, followService, fundService, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.fundList = [];
        this.user = authService.getLoggedInUser();
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
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.navToTopFunds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__topfunds_topfunds__["a" /* TopFundsPage */]);
    };
    HomePage.prototype.navToByRegionPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__regionalfunds_regionalfunds__["a" /* RegionalfundsPage */]);
    };
    HomePage.prototype.navUserInfo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__user_user__["a" /* UserPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/home/home.html"*/'<ion-content>\n     <ion-row>\n        <button ion-button class="top100-btn" (click)="navToTopFunds()">Top 100 Mutual Funds</button>\n    </ion-row>\n    <ion-row>\n        <button ion-button class="region-btn"  (click)="navToByRegionPage()">Mutual Funds by Region</button>\n    </ion-row>\n    <ion-row>\n        <button ion-button class="region-btn" (click)="navUserInfo()">User Page</button>\n    </ion-row>\n    <ion-row>\n        <div class = "watching">\n            Watching\n        </div>\n    </ion-row>\n    <ion-row class="previewlist">\n        <ion-row class="preview" *ngFor="let fund of fundList">\n            <component-preview *ngIf="fund" [security_in] = "fund">\n            </component-preview>\n        </ion-row>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_6__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_7__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_security__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_investments_investments__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_reports_reports__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_following_service__ = __webpack_require__(53);
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
    function SecurityPage(navCtrl, navParams, followService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.followService = followService;
        this.security = null;
        this.follow_status = false;
    }
    SecurityPage.prototype.ngOnInit = function () {
        this.security = this.navParams.get('param');
        console.log("this.security", this.security);
        this.volume_traded = this.security.price_history[0]['5. volume'];
        console.log(' on init ');
        this.checkFollowing();
        // this will remove the investments and reports buttons if the security is a stock
        if (this.security instanceof __WEBPACK_IMPORTED_MODULE_2__models_security__["b" /* Stock */]) {
            this.is_stock = true;
        }
        else {
            this.is_stock = false;
        }
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
    SecurityPage.prototype.removeFollow = function () {
        var _this = this;
        this.followService.deleteFollow(this.security.id)
            .then(function (status) {
            if (status) {
                _this.follow_status = false;
            }
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    SecurityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-security',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/security/security.html"*/'<ion-content class="security-content" padding>\n    <ion-row class=\'fund-name\'>\n        {{security.name || "TEST"}} ({{security.id || "TEST" | uppercase}})\n    </ion-row>\n    <ion-row>\n    	<button *ngIf="!follow_status" ion-button class="follow-btn" id = "follow-btn" (click)="postFollow()">\n    		Follow\n    		<ion-icon name="md-add-circle" id="follow-icon" class = "follow-icon"></ion-icon> \n    	</button>\n    	<button *ngIf="follow_status" ion-button class="unfollow-btn" id = "unfollow-btn" (click)="removeFollow()">\n    		Following\n    		<ion-icon name="md-remove-circle" id="unfollow-icon" class = "unfollow-icon"></ion-icon> \n    	</button>\n	</ion-row>\n    <ion-row class=\'info-label\'>\n    	Current Share Price\n	</ion-row>\n	<ion-row class=\'info-value\'>\n		${{security.current_price || "99.99" | number : \'1.2-2\'}}\n	</ion-row>\n	<ion-row class=\'info-label\'>\n    	Volume Traded\n	</ion-row>\n	<ion-row class=\'info-value\'>\n		{{volume_traded || "1000000" | number : \'1.0-0\'}}\n	</ion-row>\n	<ion-row class=\'fund-graph\'>\n		<div class="graph-wrapper">\n			<component-securitygraph fund_id_in={{security.id}}>\n			</component-securitygraph>\n		</div>\n	</ion-row>\n	<ion-row *ngIf="!is_stock" id = "investments-btn-row">\n        <button ion-button class="investments-btn" (click)="openInvestmentsPage()">Investments</button>\n    </ion-row>\n    <ion-row *ngIf="!is_stock" id = "reports-btn-row">\n        <button ion-button class="reports-btn" (click)="openReportsPage()">Reports</button>\n    </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/security/security.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__services_following_service__["a" /* FollowingService */]])
    ], SecurityPage);
    return SecurityPage;
}());

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_restapi_restapi__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Http, Response } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';





var AuthService = (function () {
    function AuthService(restapiProvider, storage) {
        this.restapiProvider = restapiProvider;
        this.storage = storage;
    }
    AuthService.prototype.login = function (loginCredentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.restapiProvider.Login(loginCredentials)
                .then(function (user) { if (user && user.username)
                resolve(_this.authenticate(user));
            else
                resolve(user); });
        });
    };
    AuthService.prototype.logout = function () {
        this.storage.remove('token');
    };
    AuthService.prototype.getUser = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.restapiProvider.getUser(token)
                .then(function (user) { if (user)
                resolve(_this.assign(user, token));
            else
                reject(user); });
        });
    };
    AuthService.prototype.getLoggedInUser = function () {
        return this.user;
    };
    AuthService.prototype.assign = function (user, token) {
        var _this = this;
        console.log('Got a User');
        console.log(user);
        user.token = token;
        return new Promise(function (resolve, reject) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */](user);
            resolve(_this.user);
        });
    };
    AuthService.prototype.authenticate = function (res) {
        var _this = this;
        console.log('WE SHOULD NOT BE HERE. GET TO THE CHOPPER;');
        return new Promise(function (resolve, reject) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */](res);
            console.log('User Set');
            console.log(_this.user);
            _this.storage.set('token', _this.user.token);
            console.log(_this.user.token);
            console.log('This is a promise?');
            resolve(_this.user);
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_restapi_restapi__["a" /* RestapiProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(382);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FundService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_security__ = __webpack_require__(182);
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
    function FundService(http, endpointService) {
        this.http = http;
        this.endpointService = endpointService;
        this.url = this.endpointService.base + '/api/f';
    }
    FundService.prototype.listFunds = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                var idList = [];
                for (var i in resJson.data) {
                    idList.push(resJson.data[i]['fund_id']);
                }
                return resolve(idList);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FundService.prototype.getFund = function (fund_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
            _this.http.get(_this.url + '/' + fund_id, options).toPromise()
                .then(function (res) {
                var resJson = res.json();
                var fundToReturn = new __WEBPACK_IMPORTED_MODULE_5__models_security__["a" /* Fund */](resJson.fund_id, resJson.fund_name, resJson.price_history);
                // console.log(resJson.holdings);
                fundToReturn.setHoldings(resJson.holdings);
                return resolve(fundToReturn);
            })
                .catch(_this.handleErrorPromise);
        });
    };
    FundService.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    FundService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__endpoint_service__["a" /* EndpointService */]])
    ], FundService);
    return FundService;
}());

//# sourceMappingURL=fund.service.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_restapi_restapi__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_main__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_charts__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_main__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_main__ = __webpack_require__(495);
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
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["i" /* RootPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["m" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["b" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["g" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["k" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["d" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["j" /* SecurityPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["l" /* TopFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["f" /* RegionalfundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["c" /* InvestmentsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["h" /* ReportsPage */],
                __WEBPACK_IMPORTED_MODULE_13__components_main__["a" /* PreviewComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_main__["b" /* SecurityGraphComponent */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["e" /* MenuPage */],
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
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["i" /* RootPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["m" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["b" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["g" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["k" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["d" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["j" /* SecurityPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["l" /* TopFundsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["e" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["h" /* ReportsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["c" /* InvestmentsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_main__["f" /* RegionalfundsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__services_main__["g" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["d" /* FundService */],
                __WEBPACK_IMPORTED_MODULE_8__providers_restapi_restapi__["a" /* RestapiProvider */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["b" /* EndpointService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["c" /* FollowingService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["e" /* PredictionService */],
                __WEBPACK_IMPORTED_MODULE_9__services_main__["f" /* SecurityService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
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
    function UserService(http) {
        this.http = http;
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
    UserService.prototype.addUser = function (user) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        // TODO: Consider changing this to an observable.
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url, user, options).toPromise()
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], UserService);
    return UserService;
}());

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(99);
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
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__main__["b" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__main__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__main__["m" /* UserPage */];
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

/***/ 42:
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

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(98);
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
    function LoginPage(loadingCtrl, alertController, authService, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.alertController = alertController;
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
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
            .then(function (user) { if (user && user.username)
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
        else
            _this.resetLoginPage(); });
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertController.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    	<h1 id = "StackReportTitle"> StackReport! </h1>\n      	<img id = "logo" src="../../assets/img/logo-image-for-login-page.png"/>\n      	<h2 id = "SignInHeader"> Sign in! </h2>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form (ngSubmit)="login()" #registerForm="ngForm">      \n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="loginCredentials.username" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="loginCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n        </ion-col>\n      </ion-row>\n    </form>          \n    <button ion-button class="register-btn" block clear (click)="createAccount()">New user? Create an account.</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_root_root__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__ = __webpack_require__(98);
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
    function MyApp(platform, statusBar, splashScreen, storage, authService) {
        var _this = this;
        this.storage = storage;
        this.authService = authService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_root_root__["a" /* RootPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.getUserToken();
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.getUserToken = function () {
        var _this = this;
        this.storage.get('token').then(function (token) {
            console.log('Is Logged in : ', token);
            _this.token = token;
            console.log(token);
            if (_this.token) {
                console.log("Here");
                _this.authService.getUser(token).then(function (user) {
                    if (user.username) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_menu_menu__["a" /* MenuPage */];
                    }
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
            }
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 238,
	"./af.js": 238,
	"./ar": 239,
	"./ar-dz": 240,
	"./ar-dz.js": 240,
	"./ar-kw": 241,
	"./ar-kw.js": 241,
	"./ar-ly": 242,
	"./ar-ly.js": 242,
	"./ar-ma": 243,
	"./ar-ma.js": 243,
	"./ar-sa": 244,
	"./ar-sa.js": 244,
	"./ar-tn": 245,
	"./ar-tn.js": 245,
	"./ar.js": 239,
	"./az": 246,
	"./az.js": 246,
	"./be": 247,
	"./be.js": 247,
	"./bg": 248,
	"./bg.js": 248,
	"./bm": 249,
	"./bm.js": 249,
	"./bn": 250,
	"./bn.js": 250,
	"./bo": 251,
	"./bo.js": 251,
	"./br": 252,
	"./br.js": 252,
	"./bs": 253,
	"./bs.js": 253,
	"./ca": 254,
	"./ca.js": 254,
	"./cs": 255,
	"./cs.js": 255,
	"./cv": 256,
	"./cv.js": 256,
	"./cy": 257,
	"./cy.js": 257,
	"./da": 258,
	"./da.js": 258,
	"./de": 259,
	"./de-at": 260,
	"./de-at.js": 260,
	"./de-ch": 261,
	"./de-ch.js": 261,
	"./de.js": 259,
	"./dv": 262,
	"./dv.js": 262,
	"./el": 263,
	"./el.js": 263,
	"./en-au": 264,
	"./en-au.js": 264,
	"./en-ca": 265,
	"./en-ca.js": 265,
	"./en-gb": 266,
	"./en-gb.js": 266,
	"./en-ie": 267,
	"./en-ie.js": 267,
	"./en-il": 268,
	"./en-il.js": 268,
	"./en-nz": 269,
	"./en-nz.js": 269,
	"./eo": 270,
	"./eo.js": 270,
	"./es": 271,
	"./es-do": 272,
	"./es-do.js": 272,
	"./es-us": 273,
	"./es-us.js": 273,
	"./es.js": 271,
	"./et": 274,
	"./et.js": 274,
	"./eu": 275,
	"./eu.js": 275,
	"./fa": 276,
	"./fa.js": 276,
	"./fi": 277,
	"./fi.js": 277,
	"./fo": 278,
	"./fo.js": 278,
	"./fr": 279,
	"./fr-ca": 280,
	"./fr-ca.js": 280,
	"./fr-ch": 281,
	"./fr-ch.js": 281,
	"./fr.js": 279,
	"./fy": 282,
	"./fy.js": 282,
	"./gd": 283,
	"./gd.js": 283,
	"./gl": 284,
	"./gl.js": 284,
	"./gom-latn": 285,
	"./gom-latn.js": 285,
	"./gu": 286,
	"./gu.js": 286,
	"./he": 287,
	"./he.js": 287,
	"./hi": 288,
	"./hi.js": 288,
	"./hr": 289,
	"./hr.js": 289,
	"./hu": 290,
	"./hu.js": 290,
	"./hy-am": 291,
	"./hy-am.js": 291,
	"./id": 292,
	"./id.js": 292,
	"./is": 293,
	"./is.js": 293,
	"./it": 294,
	"./it.js": 294,
	"./ja": 295,
	"./ja.js": 295,
	"./jv": 296,
	"./jv.js": 296,
	"./ka": 297,
	"./ka.js": 297,
	"./kk": 298,
	"./kk.js": 298,
	"./km": 299,
	"./km.js": 299,
	"./kn": 300,
	"./kn.js": 300,
	"./ko": 301,
	"./ko.js": 301,
	"./ky": 302,
	"./ky.js": 302,
	"./lb": 303,
	"./lb.js": 303,
	"./lo": 304,
	"./lo.js": 304,
	"./lt": 305,
	"./lt.js": 305,
	"./lv": 306,
	"./lv.js": 306,
	"./me": 307,
	"./me.js": 307,
	"./mi": 308,
	"./mi.js": 308,
	"./mk": 309,
	"./mk.js": 309,
	"./ml": 310,
	"./ml.js": 310,
	"./mr": 311,
	"./mr.js": 311,
	"./ms": 312,
	"./ms-my": 313,
	"./ms-my.js": 313,
	"./ms.js": 312,
	"./mt": 314,
	"./mt.js": 314,
	"./my": 315,
	"./my.js": 315,
	"./nb": 316,
	"./nb.js": 316,
	"./ne": 317,
	"./ne.js": 317,
	"./nl": 318,
	"./nl-be": 319,
	"./nl-be.js": 319,
	"./nl.js": 318,
	"./nn": 320,
	"./nn.js": 320,
	"./pa-in": 321,
	"./pa-in.js": 321,
	"./pl": 322,
	"./pl.js": 322,
	"./pt": 323,
	"./pt-br": 324,
	"./pt-br.js": 324,
	"./pt.js": 323,
	"./ro": 325,
	"./ro.js": 325,
	"./ru": 326,
	"./ru.js": 326,
	"./sd": 327,
	"./sd.js": 327,
	"./se": 328,
	"./se.js": 328,
	"./si": 329,
	"./si.js": 329,
	"./sk": 330,
	"./sk.js": 330,
	"./sl": 331,
	"./sl.js": 331,
	"./sq": 332,
	"./sq.js": 332,
	"./sr": 333,
	"./sr-cyrl": 334,
	"./sr-cyrl.js": 334,
	"./sr.js": 333,
	"./ss": 335,
	"./ss.js": 335,
	"./sv": 336,
	"./sv.js": 336,
	"./sw": 337,
	"./sw.js": 337,
	"./ta": 338,
	"./ta.js": 338,
	"./te": 339,
	"./te.js": 339,
	"./tet": 340,
	"./tet.js": 340,
	"./tg": 341,
	"./tg.js": 341,
	"./th": 342,
	"./th.js": 342,
	"./tl-ph": 343,
	"./tl-ph.js": 343,
	"./tlh": 344,
	"./tlh.js": 344,
	"./tr": 345,
	"./tr.js": 345,
	"./tzl": 346,
	"./tzl.js": 346,
	"./tzm": 347,
	"./tzm-latn": 348,
	"./tzm-latn.js": 348,
	"./tzm.js": 347,
	"./ug-cn": 349,
	"./ug-cn.js": 349,
	"./uk": 350,
	"./uk.js": 350,
	"./ur": 351,
	"./ur.js": 351,
	"./uz": 352,
	"./uz-latn": 353,
	"./uz-latn.js": 353,
	"./uz.js": 352,
	"./vi": 354,
	"./vi.js": 354,
	"./x-pseudo": 355,
	"./x-pseudo.js": 355,
	"./yo": 356,
	"./yo.js": 356,
	"./zh-cn": 357,
	"./zh-cn.js": 357,
	"./zh-hk": 358,
	"./zh-hk.js": 358,
	"./zh-tw": 359,
	"./zh-tw.js": 359
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
webpackContext.id = 476;

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__preview_preview__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__securityGraph_securityGraph__ = __webpack_require__(497);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__preview_preview__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__securityGraph_securityGraph__["a"]; });



//# sourceMappingURL=main.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_security_security__ = __webpack_require__(188);
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
            this.security.current_price < this.security.price_history[0]['1. open']) {
            this.price_color = 'price red';
        }
        else if (this.security.price_history.length > 0 &&
            this.security.current_price > this.security.price_history[0]['1. open']) {
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

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityGraphComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_fund_service__ = __webpack_require__(37);
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
    function SecurityGraphComponent(fundService) {
        this.fundService = fundService;
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
        this.fund = null;
    }
    SecurityGraphComponent.prototype.populateGraph = function () {
        var _this = this;
        // populate graph (last 5 days))
        [0, 1, 2, 3, 4].forEach(function (i) {
            _this.lineChartData[0].data[4 - i] = _this.fund.price_history[i]['4. close'];
            var date = new Date(_this.fund.price_history[i]['date']);
            var month = date.getMonth() + 1;
            var formatted = month + "/" + date.getDate();
            _this.lineChartLabels[4 - i] = formatted;
        });
    };
    SecurityGraphComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fund = null; //new Fund(this.fund_id_from_front);
        this.fundService.getFund(this.fund_id_from_front)
            .then(function (fundReturned) {
            _this.fund = fundReturned;
            _this.populateGraph();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    // events 
    SecurityGraphComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    SecurityGraphComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('fund_id_in'),
        __metadata("design:type", Object)
    ], SecurityGraphComponent.prototype, "fund_id_from_front", void 0);
    SecurityGraphComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'component-securitygraph',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/components/securityGraph/securityGraph.html"*/'<div class="row">\n    <div *ngIf="fund">\n        <div class="col-md-6">\n            <div style="display: block;">\n            <canvas baseChart width="400" height="200"\n                        [datasets]="lineChartData"\n                        [labels]="lineChartLabels"\n                        [options]="lineChartOptions"\n                        [colors]="lineChartColors"\n                        [legend]="lineChartLegend"\n                        [chartType]="lineChartType"\n                        (chartHover)="chartHovered($event)"\n                        (chartClick)="chartClicked($event)"></canvas>\n            </div>\n        </div>\n    </div>\n</div>'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/components/securityGraph/securityGraph.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_fund_service__["a" /* FundService */]])
    ], SecurityGraphComponent);
    return SecurityGraphComponent;
}());

//# sourceMappingURL=securityGraph.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__endpoint_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_service__ = __webpack_require__(20);
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
                'Authorization': _this.authService.user.getToken()
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

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopFundsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_following_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fund_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TopFundsPage = (function () {
    function TopFundsPage(loadingCtrl, navCtrl, navParams, menuCtrl, followService, fundService, authService, applicationRef) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.applicationRef = applicationRef;
        this.fundList = [];
        this.user = this.authService.getLoggedInUser();
    }
    TopFundsPage.prototype.ngOnInit = function () {
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
    TopFundsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    TopFundsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-topfunds',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/topfunds/topfunds.html"*/'<ion-content class="home-content" padding>\n    <ion-row>\n    	<div class="title">\n        	Top Mutual Funds\n    	</div>\n	</ion-row>\n	<ion-row class="previewlist">\n		<ion-row class="preview" *ngFor="let fund of fundList">\n			<component-preview *ngIf="fund" [security_in] = "fund">\n			</component-preview>\n		</ion-row>\n	</ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/topfunds/topfunds.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_4__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], TopFundsPage);
    return TopFundsPage;
}());

//# sourceMappingURL=topfunds.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegionalfundsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_following_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fund_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegionalfundsPage = (function () {
    function RegionalfundsPage(loadingCtrl, navCtrl, navParams, menuCtrl, followService, fundService, authService, applicationRef) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.followService = followService;
        this.fundService = fundService;
        this.authService = authService;
        this.applicationRef = applicationRef;
        this.fundList = [];
        this.user = this.authService.getLoggedInUser();
    }
    RegionalfundsPage.prototype.ngOnInit = function () {
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
    RegionalfundsPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    RegionalfundsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-regionalfunds',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/regionalfunds/regionalfunds.html"*/'<ion-content class="home-content" padding>\n    <ion-row>\n        <div class="title">\n            Mutual Funds by Region\n        </div>\n    </ion-row>\n    \n    <!-- Currently only support funds from North America -->\n    <h2 class="title">North America</h2>\n    <ion-row class="previewlist">\n        <ion-row class="preview" *ngFor="let fund of fundList">\n            <component-preview *ngIf="fund" [security_in] = "fund">\n            </component-preview>\n        </ion-row>\n    </ion-row>    \n</ion-content>\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/regionalfunds/regionalfunds.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__services_following_service__["a" /* FollowingService */], __WEBPACK_IMPORTED_MODULE_4__services_fund_service__["a" /* FundService */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]])
    ], RegionalfundsPage);
    return RegionalfundsPage;
}());

//# sourceMappingURL=regionalfunds.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestapiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_user__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_endpoint_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
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
            }, function (err) { resolve(new __WEBPACK_IMPORTED_MODULE_2__models_user__["a" /* User */]({ 'empty': 'true' })); });
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
        /*console.log('Username: ' + registerCredentials.username);
        console.log('Password: ' + registerCredentials.password);*/
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

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_main__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main__ = __webpack_require__(99);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__main__["b" /* HomePage */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_3__main__["b" /* HomePage */] },
            { title: 'Top Mutual Funds', component: __WEBPACK_IMPORTED_MODULE_3__main__["l" /* TopFundsPage */] },
            { title: 'Funds By Region', component: __WEBPACK_IMPORTED_MODULE_3__main__["f" /* RegionalfundsPage */] },
            { title: 'My account', component: __WEBPACK_IMPORTED_MODULE_3__main__["m" /* UserPage */] },
        ];
        this.authService = authService;
        this.app = app;
    }
    MenuPage.prototype.back = function () {
        if (this.nav.canGoBack())
            this.nav.pop();
    };
    MenuPage.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MenuPage.prototype.logout = function () {
        this.authService.logout();
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__main__["d" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu',template:/*ion-inline-start:"/Users/Luke/Documents/Fintech/mobile/src/pages/menu/menu.html"*/'<ion-menu [content]="content">\n    <ion-header>\n        <ion-toolbar>\n        <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header>\n      \n    <ion-content>\n        <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            {{p.title}}\n        </button>\n        <button ion-item (click)="logout()">\n            Logout\n        </button>\n        </ion-list>\n    </ion-content>\n</ion-menu>\n\n    \n<ion-header id="nav-bar-super">\n    <ion-navbar class="navigation-bar">\n        <ion-buttons left>\n            <button ion-button icon-only start class="button" id="backButton" (click)="back()">\n                <ion-icon name="arrow-back" class="back-btn"></ion-icon>\n            </button>\n            <button ion-button menuToggle start class="menu-btn">\n                <ion-icon name="menu"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title class="title">StackReport</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav class="menu-nav" [root]="rootPage" #content swipeBackEnabled="false">\n</ion-nav>\n\n'/*ion-inline-end:"/Users/Luke/Documents/Fintech/mobile/src/pages/menu/menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__services_main__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__root_root__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__security_security__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__topfunds_topfunds__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__menu_menu__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reports_reports__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__regionalfunds_regionalfunds__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__investments_investments__ = __webpack_require__(123);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_6__root_root__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__home_home__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_2__user_user__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__login_login__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__register_register__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_7__security_security__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_8__topfunds_topfunds__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__menu_menu__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_12__investments_investments__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_10__reports_reports__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_11__regionalfunds_regionalfunds__["a"]; });














//# sourceMappingURL=main.js.map

/***/ })

},[360]);
//# sourceMappingURL=main.js.map