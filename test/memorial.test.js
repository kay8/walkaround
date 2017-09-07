'use strict';

const Helper = require('hubot-test-helper')
const co = require('co')
const expect = require('chai').expect
const sinon = require('sinon')

const PATH = './../scripts/memorial.js'
const Memorial = require(PATH).Memorial

describe('notify passed days', function() {

  let room = null
  const helper = new Helper(PATH)

  beforeEach(function() {
    return room = helper.createRoom();
  });

  afterEach(function() {
    return room.destroy();
  });

  return context('user says 記念日', function() {
    beforeEach(function() {
      return co(function*() {
        yield room.user.say('alice', '記念日')
      })
    })

    return it('should notify in channel', function() {
      // TODO dynamically change hubot reply
      return expect(room.messages).to.eql([
        ['alice', '記念日'],
        ['hubot', '🎉 付き合い始めてから35日目'],
      ])
    })
  })

})