'use strict'

class Emitter {
    constructor() {
        this._events = {};
    }

    subscribe(eventName, subscriber) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(subscriber);
    }

    unsubscribe(eventName, subscriber) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(sbcr => subscriber !== sbcr);
        }
    }

    notify(eventName, data) {
        this._events[eventName].forEach(subscriber => subscriber(data));
    }
}

class User {
    constructor(name) {
        this._name = name;
        this.post = this.post.bind(this);
    }

    post(data) {
        console.log(`${this._name} has a news post from ${data}`);
    }
}

class Journalist {
    constructor(name, ee) {
        this._name = name;
        this._ee = ee;
    }

    postMessage(section) {
	    this._ee.notify(section, `${this._name} about ${section}`);
    }
}

let em = new Emitter();
let verge = new Journalist('Verge', em);

let user1 = new User('John');
let user2 = new User('Ed');
let user3 = new User('Tom');

em.subscribe('it', user1.post);
em.subscribe('it', user2.post);
em.subscribe('it', user3.post);
em.subscribe('cars', user2.post);
em.subscribe('sad', user3.post);

verge.postMessage('it');
verge.postMessage('cars');
verge.postMessage('sad');

