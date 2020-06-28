import {inject} from 'aurelia-dependency-injection';
import {ApiService} from './api-service';

@inject(ApiService)
export class ArticleService {

  constructor(apiService) {
    this.apiService = apiService;
  }

  getList(type, params) {
    return this.apiService.get('/cv-read-all' + ((type === 'feed') ? '/feed' : ''), params)
  }

  get(slug) {
    return this.apiService.get('/cv-read-all' + slug)
      .then(data => data.article)
  }

  destroy(slug) {
    return this.apiService.delete('/cv-read-all' + slug)
  }

  save(article) {
    if (article.slug) {
      // If we're updating an existing article
      return this.apiService.put('/cv-read-all' + article.slug, {article: article})
        .then(data => data.article)
    } else {
      // Otherwise, create a new article
      return this.apiService.post('/cv-read-all', {article: article})
        .then(data => data.article)
    }
  }

  favorite(slug) {
    return this.apiService.post('/cv-read-all' + slug + '/favorite')
  }

  unfavorite(slug) {
    return this.apiService.delete('/cv-read-all' + slug + '/favorite')
  }

}
