import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, PLATFORM} from 'aurelia-framework';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/blog.css';

@inject(PostService, AuthService)
export class App {
  public message: string = 'Hello World!';
  router: Router;
  postService;
  tags;
  archives;
  error;

  authService;
  currentUser: string;

  constructor(PostService, AuthService){
    this.postService = PostService;
    this.authService = AuthService;
  }

  attached() {
    this.currentUser = this.authService.currentUser;

    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    })

    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    })
  }

  configureRouter(config: RouterConfiguration, router){
    config.title = 'Hannes\' Blog';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'Post'},
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'Posts by tag'},
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'Posts by archive'}

    ]);
  }

}
