import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, PLATFORM} from 'aurelia-framework';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/blog.css';

@inject(EventAggregator, PostService, AuthService)
export class App {
  ea;
  router: Router;
  postService;
  tags;
  archives;
  error;

  authService;
  currentUser: string;
  subscription;

  constructor(EventAggregator, PostService, AuthService){
    this.ea = EventAggregator;
    this.postService = PostService;
    this.authService = AuthService;
  }

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })

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

    console.log(this.router.currentInstruction.params);
  }

  configureRouter(config: RouterConfiguration, router){
    this.router = router;
    config.title = 'Hannes\' Blog';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign Up'},
      { route: 'create-post', name: 'create-post', moduleId: PLATFORM.moduleName('posts/create'), title: 'Create new Post'},
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'Post'},
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'Posts by Tag'},
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'Posts by Archive'}
    ]);
  }

  detached() {
    this.subscription.dispose();
  }

  logout() {
    this.authService.logout().then(data => {
      this.ea.publish('user', null);
    }).catch(error => {
      this.error = error.message;
    })
  }

}
