import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MailService } from '../../mail.service';
import { Mail } from '../../models/mail.interface';

@Injectable()
export class MailViewResolve implements Resolve<Mail> {
  constructor(private mailService: MailService) {}
  resolve(route: ActivatedRouteSnapshot) {
      console.log('mail view: ', route.params);
    return this.mailService.getMessage(route.params.id);
  }
}
