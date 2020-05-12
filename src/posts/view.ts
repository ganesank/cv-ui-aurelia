import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class View {
  postService;
  error;
  post;

  constructor(PostService) {
    this.postService = PostService;
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
