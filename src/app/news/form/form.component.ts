import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { TdDialogService, TdLoadingService } from '@covalent/core';
import { news } from '../../../data/news';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'news-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class NewsFormComponent implements OnInit {

  headline: string;
  author: string;
  story: string;
  id: string;
  admin: boolean;
  news: Object[];
  article: {
    id: string,
    headline: string;
    author: string;
    story: string;
    posted: any;
  };
  action: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _snackBarService: MatSnackBar,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService) {
    this.news = news;
              }

  goBack(): void {
    this._router.navigate(['/news']);
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      this.id = params.id;
      if (this.id) {
        this.load();
      }
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('news.form');
      this.article = news.filter((item) => {
        return item.id === this.id;
      });
      this.headline = this.article[0].headline;
      this.author = this.article[0].author;
      this.story = this.article[0].story;
    } catch (error) {
      this._dialogService.openAlert({message: 'There was an error loading the news'});
    } finally {
      this._loadingService.resolve('news.form');
    }
  }

  async save(): Promise<void> {
    try {
      this._loadingService.register('news.form');
      let now: Date = new Date();
      this.id = (this.news.length + 1).toString();
      this.article = {
        id: this.id,
        headline: this.headline,
        author: this.author,
        story: this.story,
        posted: now
      };
      if (this.action === 'add') {
        this.news.push(this.article);
      } else {
        //update the record
      }
      this._snackBarService.open('News Saved', 'Ok');
      this.goBack();
    } catch (error) {
      this._dialogService.openAlert({message: 'There was an error saving the news'});
    } finally {
      this._loadingService.resolve('news.form');
    }
  }
}
