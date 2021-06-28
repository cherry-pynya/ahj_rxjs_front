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
  }

  init() {
    const data$ = interval(5000).pipe(
      switchMap(() => {
        ajax(`${this.url}/messages/unread`).pipe(
          map((serverResponse) => {
            console.log(serverResponse);
            serverResponse.response;
          }),
          catchError((err) => of({
            status: 'ok',
            timestamp: `${moment().format('L')} ${moment().format('LT')}`,
            messages: [],
          })),
        );
      }),
    );
    data$.subscribe((data) => {
      console.log(data);
    });
  }
}
