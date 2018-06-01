'use strict'

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const Obs = new Observable();

class Users {
	constructor(name) {
		this.userName = name;
		this.changes = new Observable;

	}
	
     notify() {
      console.log("User " + this.userName + " is notified!");
    }
  }
	

let user1 = new Users('John');
let user2 = new Users('Ed');
let user3 = new Users('Tom');


