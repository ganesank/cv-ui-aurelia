import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";
import {PostService} from "../../common/services/post-service";

@inject(EventAggregator, PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  ea;
  postService;

  allTags: string[];
  newTag: string;

  constructor(EventAggregator, PostService) {
    this.ea = EventAggregator;
    this.postService = PostService;
  }

  attached() {
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

  submit(){
  }

  valueChanged(newValue, oldValue) {
    //
  }
}
