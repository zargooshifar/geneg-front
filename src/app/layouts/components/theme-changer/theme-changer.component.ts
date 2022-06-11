import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss'],
})
export class ThemeChangerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  themes = [
    {
      value: 'default',
      name: 'روشن',
    },
    {
      value: 'dark',
      name: 'شب',
    },
    {
      value: 'cosmic',
      name: 'کهکشانی',
    },
    {
      value: 'corporate',
      name: 'سفید',
    },
  ];

  currentTheme = 'default';
  nightTheme: boolean;

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      this.currentTheme = saved;
    } else {

      if (this.themeService.currentTheme !== undefined) {
        this.currentTheme = this.themeService.currentTheme;

      }
    }
    this.nightTheme = this.currentTheme === this.themes[2].value;
    this.themeService.changeTheme(this.currentTheme);
    // this.themeService.onThemeChange()
    //  .pipe(
    //    map(({ name }) => name),
    //    takeUntil(this.destroy$),
    //  )
    //  .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
  }

  changeTheme2($event: Event) {
    if ((<HTMLInputElement>event.target).checked)
      this.themeService.changeTheme(this.themes[2].value);
    else
      this.themeService.changeTheme(this.themes[0].value);
    localStorage.setItem('theme', this.themeService.currentTheme);
  }
}
