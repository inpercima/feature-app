import { Injectable } from '@angular/core';

import * as config from '../../config.json';

@Injectable()
export class ConfigService {

  private activateLogin: boolean;

  private api: string;

  private appname: string;

  private defaultRoute: string;

  private redirectNotFound: boolean;

  private showFeatures: boolean;

  private showLogin: boolean;

  private theme: string;

  constructor() {
    this.activateLogin = (<any>config).routes.login.activate;
    this.api = (<any>config).api;
    this.appname = (<any>config).appname;
    this.defaultRoute = (<any>config).routes.default;
    this.redirectNotFound = (<any>config).routes.notFound.redirect;
    this.showFeatures = (<any>config).routes.features.show;
    this.showLogin = (<any>config).routes.login.show;
    this.theme = (<any>config).theme;
  }

  public isActivateLogin() {
    return this.activateLogin;
  }

  public getApi() {
    return this.api;
  }

  public getAppname() {
    return this.appname;
  }

  public getDefaultRoute() {
    return this.defaultRoute;
  }

  public isRedirectNotFound() {
    return this.redirectNotFound;
  }

  public isShowFeatures() {
    return this.showFeatures;
  }

  public isShowLogin() {
    return this.showLogin;
  }

  public getTheme() {
    return this.theme;
  }

}
