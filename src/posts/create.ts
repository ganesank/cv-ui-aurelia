import {inject} from 'aurelia-framework';
import {PostService} from "../common/services/post-service";
import {Router} from "aurelia-router";

@inject(PostService, Router)
export class Create {
  postService;
  router;
  post;

  constructor(PostService, Router) {
    this.postService = PostService;
    this.router =Router;
  }

  createPost() {
    this.postService.create(this.post).then(data => {
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    })
  }
}
