import { Template } from 'meteor/templating';
import AWS from 'aws-sdk';

import { Accounts } from 'meteor/accounts-base';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  Meteor.logout();
  console.log("Logged out");
});

Template.hello.events({
  'click button.buttonDirect'(event, instance) {
    const fakeEmail = `${Math.random()}@test.com`;
    Accounts.createUser({ email: fakeEmail, password: 'test' }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.info("Created and logged in as:", Meteor.userId());
      }
    })
  },
  'click button.buttonMethod'(event, instance) {
    Meteor.call("go", (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.info("Created:", result);
      }
    })
  },
  'click button.buttonAws'(event, instance) {
    Meteor.call("goAws", (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.info("Created after AWS:", result);
      }
    })
  },
});
