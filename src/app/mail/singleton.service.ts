import { Mail } from './models/mail.interface';
import { Injectable, OnDestroy } from '@angular/core';


@Injectable()
export class SingletonService {
    private mail: Mail[] = [];

    constructor() {
        this.Mail = [];
    }

    set Mail(value: Mail[]) {
        this.mail = value;
    }

    get Mail(): Mail[] {
        return this.mail;
    }

    public config(mail: Mail[] ): boolean {
        this.mail = mail;
        return true;
    }


    public getSpecificMail(id: number) {
        return this.Mail.find(x => x.id === id);
    }
}
