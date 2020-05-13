import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';


@inject(Router, AuthService)
export class Login {
  router;
  authService;
  name: string;
  error: string;

  constructor(Router, AuthService) {
    this.router = Router;
    this.authService = AuthService;
  }

  activate() {
    this.error = null;
  }

  login() {
    this.error = null;
    this.authService.login(this.name).then(data => {
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
