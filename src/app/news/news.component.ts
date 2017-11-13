import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { news } from '../../data/news';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements AfterViewInit, OnInit {
  news: Object[];
  filteredNews: any[];

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _snackBarService: MatSnackBar,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) { }

  ngOnInit(): void {
    this._titleService.setTitle('Stock Market News');
    this.load();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  filterNews(searchWord: string = ''): void {
    this.filteredNews = this.news.filter((article) => {
      return article['headline'].toLowerCase().indexOf(searchWord.toLowerCase()) > -1;
    });
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('news.list');
      this.news = news;
    } catch (error) {
      this.news = news;
    } finally {
      this.filteredNews = Object.assign([], this.news);
      this._loadingService.resolve('hews.list');
    }
  }

  delete(id: string): void {
    this._dialogService
      .openConfirm({message: 'Are you sure you want to delete this article?'})
      .afterClosed().toPromise().then((confirm: boolean) => {
        if (confirm) {
          this._delete(id);
        }
      });
  }

  private async _delete(id: string): Promise<void> {
    try {
      this._loadingService.register('users.list');
      this.filteredNews = this.filteredNews.filter((article) => {
        return article.id !== id;
      });
      this._snackBarService.open('User Deleted', 'Ok');
    } catch (error) {
      this._dialogService.openAlert({message: 'There was an error trying to delete the user'});
    } finally {
      this._loadingService.resolve('users.list');
    }
  }

}
