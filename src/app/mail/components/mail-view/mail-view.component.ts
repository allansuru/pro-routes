import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-view',
  styleUrls: ['mail-view.component.scss'],
  template: `
    <div class="mail-view">
      <h2>{{ (message | async).from }}</h2>
      <p>{{ (message | async).full }}</p>
    </div>
  `
})
export class MailViewComponent implements OnInit {
  message: Observable<Mail> = this.route.data.pluck('message');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.message.subscribe(m => {
      console.log('message: ', m);
    });
  }
}
