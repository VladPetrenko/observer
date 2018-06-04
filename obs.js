'use strict'

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
/*     let idx = this.observers.indexOf(observer);
     if (idx != -1) {
      return this.observers.splice(idx, 1);
     }
    return false*/
    this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }

  once() {
   // 
  }

  countObservers() {
    // the number of observers
  }
}



class User {
  constructor(name) {
    this.name = name;
    this.info = this.post.bind(this);
  }

   post(data) {
    console.log(`${this.name} has a news post from Journalist about ${data}`);
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