import Email from './mail';

const mail = new Email('.app-container', 'http://localhost:7777/messages/unread');
mail.init();
