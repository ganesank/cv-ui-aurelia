import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Index {
  postService;
  posts;
  error;

  constructor(PostService) {
    this.postService = PostService;
  }

  attached() {
    this.error = ''; //resets Error when component is called multiple times
    this.postService.allPostPreviews().then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
