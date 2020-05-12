import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-framework';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/blog.css';

export class App {
  public message: string = 'Hello World!';
  router: Router;

  configureRouter(config: RouterConfiguration, router){
    config.title = 'Arise\'s Blog';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'Post'}
    ]);
  }

}
