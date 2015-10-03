/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Tag = require('../api/tag/tag.model');
var User = require('../api/user/user.model');

Tag.find({}).remove(function() {
  Tag.create({
    name : 'Prayer',
    isPublic : true
  }, {
    name : 'Ping-pong',
    isPublic : true
  }, {
    name : 'Board Member',
    isPublic : false
  },  {
    name : 'Member',
    isPublic : false
  },  {
    name : 'Associate Member',
    isPublic : false
  },{
    name : 'Worship Team',
    isPublic : false
  }, {
    name : 'Prayer Team',
    isPublic : false
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    firstname: 'Martin',
    lastname: 'Stidham',
    email: 'a@a.com',
    password: 'a',
    hometown: "Lyons IL",
    position: "board"
  },
  {
    provider: 'local',
    role: 'user',
    firstname: 'Yen',
    lastname: 'Jung',
    email: 'b@b.com',
    password: 'b',
    position: 'member'
  },
  {
    provider: 'local',
    role: 'user',
    firstname: 'Dale',
    lastname: 'Voelker',
    email: 'c@c.com',
    password: 'c',
    position: 'associate'
  },
  {
    provider: 'local',
    role: 'admin',
    firstname: 'Joseph',
    lastname: 'Jung',
    email: 'jungyue@gmail.com',
    password: 'a',
    position: 'friend'
  }, function() {
      console.log('finished populating users');
    }
  );
});
