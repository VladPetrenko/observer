'use strict'

class Observable {
  constructor() {
    this._observers = [];
    this._observersOnce = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  subscribeOnce(observer) {
   this._observersOnce.push(observer); 
  }

  unsubscribe(observer) {
     this._observers.splice(this._observers.indexOf(observer), 1)
    // this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notify(data) {
    this._observers.forEach(observer => observer(data));
    this._observersOnce.forEach(observer => observer(data));
    if(this._observersOnce.length > 0){
      this._observersOnce.length = 0;
    }
  }


  countObservers() {
    console.log(this._observers.length);
  }
}



class User {
  constructor(name) {
    this._name = name;
    this.post = this.post.bind(this);
  }

   post(data) {
    console.log(`${this._name} has a news post from Journalist about ${data}`);
   }
  }

class Journalist {
  constructor(obs) {
    this._obs = obs;
  }

  postMessage(data = 'nothing') {
    this._obs.notify(data);
  }
}

let obs = new Observable('Observer');
let verge = new Journalist(obs);

let user1 = new User('John');
let user2 = new User('Ed');
let user3 = new User('Tom');
let user4 = new User('Dima Once');
let user5 = new User('Grisha Once');
let user6 = new User('Katya Once');

obs.subscribe(user1.post);
obs.subscribe(user2.post);
obs.subscribe(user3.post);
obs.subscribeOnce(user4.post);
obs.subscribeOnce(user5.post);
obs.subscribeOnce(user6.post);

verge.postMessage();

obs.unsubscribe(user3.post);

verge.postMessage('weather');
