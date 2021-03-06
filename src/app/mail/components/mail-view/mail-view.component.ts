import { SingletonService } from './../../singleton.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import { Mail } from '../../models/mail.interface';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'mail-view',
  styleUrls: ['mail-view.component.scss'],
  template: `
    <div class="mail-view">
      <h2>{{ (message | async).from }}</h2>
      <p>{{ (message | async).full }}</p>
    </div>
    <div class="mail-reply">
      <textarea
        (change)="updateReply($event.target.value)"
        placeholder="Type your reply..."
        [value]="reply">
      </textarea>
      <button type="button" (click)="sendReply()">
        Send
      </button>
    </div>
  `
})

export class MailViewComponent implements OnInit {
  reply = '';
  hasUnsavedChanges = false;
  message: Observable<Mail> = this.route.data.pluck('message');

  mails: Mail[] = [];
  mail: Mail;
  id: number;
  constructor(private route: ActivatedRoute, private singletonService: SingletonService) {}

  ngOnInit() {
    console.log(this.route.params['id']);
    this.id = Number(this.route.params['_value'].id);
    this.message.subscribe(m => {
      console.log('message: ', m);
    });

    this.getMailsFromSingleton();
    this.getMailById(this.id);

    this.route.params.subscribe(() => {
      this.reply = '';
      this.hasUnsavedChanges = false;
    });
  }

  getMailsFromSingleton() {
   this.mails = this.singletonService.Mail;
   console.log('emails oriundo do singleton no component view: ', this.mails);
  }

  getMailById(id) {
   this.mail =  this.singletonService.getSpecificMail(id);
   console.log('Mail by ID: ', this.mail);

  }

  updateReply(value: string) {
    this.reply = value;
    this.hasUnsavedChanges = true;
  }

  sendReply() {
    console.log('Sent!', this.reply);
    this.hasUnsavedChanges = false;
  }
}
