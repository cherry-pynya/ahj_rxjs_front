import Email from './mail';

const mail = new Email('.app-container', 'http://localhost/7777');
//mail.init();


function getData() {
  return new Promise((res) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/7777/messages/unread');
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            res(xhr.response);
        }
    });
    xhr.send();
  });
}

const a = getData();
a.then((res) => { console.log(res) });
