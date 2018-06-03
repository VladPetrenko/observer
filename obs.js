'use strict'

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }

  once() {

  }

  sth() {

  }
}



class User {
  constructor(name) {
    this.userName = name;
    this.info = this.post.bind(this);
  }

   post(data) {
    console.log(`${this.userName} has a news post from Journalist about ${data}`);
   }
  }

class Journalist {
    constructor(name) {
        this.name = name;
    }
    
    postMessage(data) {
        return `${data}`;
    }
}

	
let obs = new Observable();
let verge = new Journalist('Verge');
let bloomberg = new Journalist('Bloomberg');
let user1 = new User('John');
let user2 = new User('Ed');
let user3 = new User('Tom');

obs.subscribe(user1.info);
obs.subscribe(user2.info);
obs.subscribe(user3.info);

obs.notify(verge.postMessage('yohoo'));

obs.unsubscribe(user3.info);

obs.notify(bloomberg.postMessage('sth new'));