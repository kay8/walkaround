'use strict';

const Helper = require('hubot-test-helper')
const co = require('co')
const expect = require('chai').expect
const sinon = require('sinon')

const PATH = './../scripts/memorial.js'
const Memorial = require(PATH).Memorial

describe('notify passed days', () => {

  let room = null
  const helper = new Helper(PATH)

  beforeEach(() => room = helper.createRoom());

  afterEach(() => room.destroy());

  return context('user says 記念日', () => {
    beforeEach(() => co(function*() {
      yield room.user.say('alice', '記念日')
    }))

    return it('should notify in channel', () => {
      const days = Memorial.get_passed_days()
      expect(room.messages).to.eql([
        ['alice', '記念日'],
        ['hubot', `@alice 🎉 付き合い始めてから${days}日目`],
      ])
    })

  })

})