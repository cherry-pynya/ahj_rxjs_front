/* eslint-disable class-methods-use-this */
import { of, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, switchMap } from 'rxjs/operators';
import moment from 'moment';

export default class Email {
  constructor(elem, url) {
    if (typeof (elem) === 'string') {
      this.element = document.querySelector(elem);
    } else {
      this.element = elem;
    }
    this.url = url;
    this.messages = this.element.querySelector('.messages-container');
    this.log = [];
  }

  init() {
    const data$ = interval(5000).pipe(
      switchMap(() => ajax(this.url).pipe(
        map((result) => result.response),
        catchError(() => of({ timestamp: `${moment().format('L')} ${moment().format('LT')}`, messages: [] })),
      )),
    );
    data$.subscribe((result) => {
      const resultData = result;
      resultData.messages.forEach((el) => {
        if (this.log.find((item) => item.id === el.id) === undefined) {
          this.log.push(el);
          this.messages.insertAdjacentHTML('afterbegin', this.messageFactory(el));
        }
      });
    });
  }

  messageFactory(obj) {
    const text = obj.text.slice(0, 18);
    return `
    <div class='message' id='${obj.id}'>
                <div class='sender'>
                    <span>${obj.from}</span>
                </div>
                <div class='text'>
                    <span>${text}...</span>
                </div>
                <div class='time'>
                    <span>${obj.timestamp}</span>
                </div>
            </div>
    `;
  }
}
