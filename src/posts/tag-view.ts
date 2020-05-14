import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class TagView {
  postService;
  tag: string;
  title: string;
  posts;
  error;

  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.tag = params.tag;
    this.title = `Viewing posts tagged with `;
    this.postService.postsByTag(this.tag).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
