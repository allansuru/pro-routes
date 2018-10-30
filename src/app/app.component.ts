import { SingletonService } from './mail/singleton.service';
import { Mail } from './mail/models/mail.interface';
import { MailService } from './mail/mail.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <header>
        <img src="/img/logo.svg">
      </header>
      <div class="app__content">
        <nav>
          <a
            [routerLink]="['/mail', { outlets: { primary: 'folder/inbox', pane: null } }]"
            routerLinkActive="active">
            Inbox
          </a>
          <a
            [routerLink]="['/mail', { outlets: { primary: 'folder/trash', pane: null } }]"
            routerLinkActive="active">
            Trash
          </a>
          <a
            [routerLink]="['/dashboard']"
            routerLinkActive="active">
            Dashboard
          </a>
        </nav>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  mails: Mail[] = [];

  constructor(private router: Router, private emailsService: MailService, private singletonService: SingletonService) {}
  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        console.log(event);
      });

      this.getMails();
  }

  getMails() {
    this.emailsService.getMessages()
    .subscribe((itens: Mail[]) => {
      this.mails = itens;
      this.singletonService.config(this.mails);
    });
  }
}
