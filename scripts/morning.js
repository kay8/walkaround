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
    this.channel = options.channel
    this.timezone = options.timeZone
    this.cronTime = options.cronTime
  }

  start(robot) {
    const job = new CronJob({
      cronTime: this.cronTime,
      onTick: () => {
        return this.greet(robot)
      },
      start: true,
      timeZone: this.timeZone,
    })

    return job
  }

  test(robot) {
    //robot.messageRoom this.channel, 'test'
  }

}