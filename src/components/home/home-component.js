import { BindingEngine } from "aurelia-framework";
import { inject } from "aurelia-dependency-injection";
import { SharedState } from "../../shared/state/shared-state";
import { ArticleService } from "../../shared/services/article-service";

@inject(SharedState, BindingEngine, ArticleService)
export class HomeComponent {
  articles = [];
  shownList = "all";
  filterTag = undefined;

  constructor(sharedState, bindingEngine, articleService) {
    this.sharedState = sharedState;
    this.bindingEngine = bindingEngine;
    this.articleService = articleService;
  }

  bind() {
    this.subscription = this.bindingEngine
      .propertyObserver(this.sharedState, "isAuthenticated")
      .subscribe((newValue, oldValue) => {
        //console.log('homeComponent isAuthenticated: ', newValue)
      });
  }

  unbind() {
    this.subscription.dispose();
  }

  attached() {
    this.getArticles();
  }

  getArticles() {
    let params = {
      limit: this.limit,
      offset: this.limit * (this.currentPage - 1)
    };
    if (this.filterTag !== undefined) params.tag = this.filterTag;
    this.articleService.getList(this.shownList, {}).then(response => {
      const na = [];
      response.forEach(function(item, index) {
        let itemis = item.data;
        na.push(itemis);
      });
      this.articles.splice(0);
      this.articles.push(...na);
    });
  }
}
