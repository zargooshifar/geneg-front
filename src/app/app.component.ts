import {Component, Injector, OnInit} from '@angular/core';
import {AnalyticsService} from './services/analytics.service';
import {SeoService} from './services/seo.service';

export let AppInjector: Injector;

@Component({
  selector: 'app-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private injector: Injector) {
    AppInjector = injector;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
