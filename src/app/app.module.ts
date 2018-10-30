import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MailModule } from './mail/mail.module';

import { AppComponent } from './app.component';
import { SingletonService } from './mail/singleton.service';

export const ROUTES: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
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
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules, enableTracing: false })
  ],
  providers: [
    SingletonService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
