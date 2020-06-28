import { bindable } from "aurelia-framework";

export class Section {
  @bindable article;

  onToggleFavorited(value) {
    if (value) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }
}
