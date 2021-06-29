import Email from './mail';

const mail = new Email('.app-container', 'https://ahj-rxjs-back.herokuapp.com/messages/unread');
mail.init();
