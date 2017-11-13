import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule, MatIconModule, MatListModule, MatTooltipModule, MatCardModule, MatButtonModule,
         MatToolbarModule, MatInputModule, MatSlideToggleModule, MatMenuModule } from '@angular/material';

import { CovalentLoadingModule, CovalentDialogsModule, CovalentMediaModule, CovalentLayoutModule,
         CovalentSearchModule, CovalentCommonModule } from '@covalent/core';

import { NewsComponent } from './news.component';
import { NewsFormComponent } from './form/form.component';

import { newsRoutes } from './news.routes';

import { NewsService } from '../../services/news.service';

export { NewsComponent, NewsFormComponent, NewsService };

@NgModule({
  declarations: [
    NewsComponent,
    NewsFormComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    RouterModule,
    // material modules
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    // covalent modules
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentMediaModule,
    CovalentLayoutModule,
    CovalentSearchModule,
    CovalentCommonModule,
    // extra
    newsRoutes,
  ], // modules needed to run this module
  providers: [ ],
})
export class NewsModule {}
