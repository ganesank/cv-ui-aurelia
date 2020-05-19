import {inject} from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";
import {PostService} from "../common/services/post-service";
import {Router} from "aurelia-router";

@inject(EventAggregator, PostService, Router)
export class Edit {
  ea;
  postService;
  router;

  post;
  title: string;
  allTags: string[];
  newTag: string;

  constructor(EventAggregator, PostService, Router) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.router =Router;
  }

  activate(params) {
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      console.log(error);
    })

    this.title="Edit Post"
  }

  editPost() {
    this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    })
  }
}
