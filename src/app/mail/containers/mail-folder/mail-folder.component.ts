import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mail } from '../../models/mail.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{ title | async }}</h2>
    <mail-item
      *ngFor="let message of (messages | async)"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent implements OnInit {

   // message e name vem do const ROUTES do mailModules
  messages: Observable<Mail[]> = this.route.data.pluck('messages');
  title: Observable<string> = this.route.params.pluck('name');
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
