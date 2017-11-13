import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'stock-market-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'stock-market',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/stock-market.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'apple',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/apple-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'amazon',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/amazon-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'google',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-logo.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
    this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
  }

}
