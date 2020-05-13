import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class ArchiveView {
  postService;
  archive;
  posts;
  error;

  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.archive = params.archive;
    this.postService.postsByArchive(this.archive).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
