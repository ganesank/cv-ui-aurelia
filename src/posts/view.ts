import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject(PostService)
export class View {
  postService;
  authService;
  error;
  post;

  constructor(PostService, AuthService) {
    this.postService = PostService;
    this.authService = AuthService;
  }

  activate(params){
    this.error = ''; //resets Error when component is called multiple times
    this.postService.find(params.slug).then(data=> {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
