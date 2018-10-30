import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy, Route } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MailModule } from './mail/mail.module';

import { AppComponent } from './app.component';
import { SingletonService } from './mail/singleton.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : Observable.of(null);
  }
}

export const ROUTES: Routes = [
  { path: 'dashboard', data: { preload: false }, loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '**', redirectTo: 'folder/inbox' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MailModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload, enableTracing: false })
  ],
  providers: [
    SingletonService,
    CustomPreload
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
