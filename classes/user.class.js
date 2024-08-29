import { v4 as uuid } from 'uuid';
export default class User {
  constructor (username, password) {
    this.userID = `user-${uuid().slice(-8)}`;
    this.username = username;
    this.password = password;
  }
}