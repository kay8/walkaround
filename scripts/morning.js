/*!
 * Description:
 * register cron jobs to schedule morning messages
 */

 'use strict';

const cronJob = require('cron').CronJob
const moment = require('moment-timezone')
const memorial = require('./../scripts/memorial.js').Memorial

const options = {
  channel: 'general',
  timeZone: 'America/Vancouver',
  cronTime: '0 0 7 * * *',
}

class Morning {
  constructor(options) {
    this.channel = 'general'
    this.timezone = 'America/Vancouver'
    this.cronTime = '0 0 7 * * *'
  }

  start(robot) {
    const job = new cronJob({
      cronTime: this.cronTime,
      onTick: () => {
        return this.notify(robot)
      },
      start: true,
      timeZone: this.timeZone,
    })

    return job
  }

  notify(robot) {
    this.getMemorial(message => {
      return robot.messageRoom(this.channel, message);
    });
  }

  getMemorial(callback) {
    return memorial.get_morning_message(callback);
  }

}

module.exports = (robot => {

  const morning = new Morning()
  return morning.start(robot)

})

module.exports.Morning = Morning