'use strict'

class Emitter {
	constructor(){
		this._events = {};
	}

	subscribe(eventName, subscriber){
		 if(!this._events[eventName]){
     		this._events[eventName] = [];
  		}
  		this._events[eventName].push(subscriber);
	}	

	unsubscribe(eventName, subscriber){
		if(this._events[eventName]){
			this._events[eventName].filter(sbcr => subscriber !== sbcr);
		}
	}

	notify(eventName, section){
		this._events[eventName].forEach(subscriber => subscriber(section));
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
  constructor(ee, section) {
    this._ee = ee;
    this._section = section;
  }

  postMessage(section = 'nothing') {
    this._ee.notify(this._section);
  }
}

let em = new Emitter();
let section = ['sad', 'it', 'weather'];
let verge = new Journalist(em, section);


let user1 = new User('John');
let user2 = new User('Ed');
let user3 = new User('Tom');

