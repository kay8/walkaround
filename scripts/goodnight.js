//
// Description:
// leave a message before a bot goes into sleep
//

'use strict';

const cronJob = require('cron').CronJob
const moment = require('moment-timezone')

class GoodNight {
  constructor(options) {
    this.channel = 'general'
    this.timezone = 'America/Vancouver'
    this.cronTime = '0 59 0 * * *'
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
    const messages = [
      'ﾈﾑﾈﾑ(ﾉω<).｡oOO',
      'ﾈﾑｲ(´･ωゞ)',
      'ｩﾄｩﾄ(´-ω-)´_ _)´-ω-)´_ _)zZZ',
      '(ρω・).。ｏ○',
      'ｺﾞｼｺﾞｼ(´pω･｡`)ﾈﾐﾈﾐ',
      '(o´･ω･o)σ【☆ﾟ+.ｵﾔｽﾐ.+ﾟ☆】',
      '(。-ω-)zzz. . . (。ﾟωﾟ) ﾊｯ!',
      '（￣、￣＠）ｚｚｚ・・ねるよー'
    ]
    const rand_index = Math.floor(Math.random() * messages.length)
    const message = messages[rand_index]
    return robot.messageRoom(this.channel, message)
  }

}

module.exports = (robot => {

  const goodnight = new GoodNight()
  return goodnight.start(robot)

})

module.exports.GoodNight = GoodNight