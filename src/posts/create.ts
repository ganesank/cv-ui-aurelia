import {inject} from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";
import {PostService} from "../common/services/post-service";
import {Router} from "aurelia-router";

@inject(EventAggregator, PostService, Router)
export class Create {
  ea;
  postService;
  router;
  post;

  allTags: string[];
  newTag: string;

  constructor(EventAggregator, PostService, Router) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.router =Router;
  }

  attached() {
    this.post = {
      title: '',
      body: '',
      tags: []
    };

    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error)
    })
  }

  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  createPost() {
    this.postService.create(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    })
  }
}
