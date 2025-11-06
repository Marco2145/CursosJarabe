import { Article } from './news.interface';

export interface ArticlesByCategoryAndPage {
  [key: string]: {
    page: number;
    articles: Article[];
  };
}
