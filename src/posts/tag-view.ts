import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class TagView {
  postService;
  tag;
  posts;
  error;

  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.tag = params.tag;
    this.postService.postsByTag(this.tag).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
