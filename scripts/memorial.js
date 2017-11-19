//
// Description:
// Memorial Information
//

'use strict';

const moment = require('moment-timezone')
const memorial = {
  fullDate: '2017-07-30 23:31',
  noYearDate: '07-30 23:31',
  tz: 'America/Vancouver',
}

class Memorial {

  constructor(options) {
    this.startingDayVan = moment.tz(memorial.fullDate, memorial.tz)
    this.today = moment().tz(memorial.tz)
  }

  start(robot) {
    const days = this.today.diff(this.startingDayVan, 'days')
    return robot.hear(/^記念日$/i, res => res.reply(`🎉 付き合い始めてから${days}日目`))
  }

  getNextMemorial() {
    const currentYear = moment().tz(memorial.tz).year()
    const nextYear = moment().add(1, 'year').tz(memorial.tz).year()

    const currentYearDateStr = `${currentYear}-${memorial.noYearDate}`
    const nextYearDateStr = `${nextYear}-${memorial.noYearDate}`

    const currentYearDate = moment.tz(currentYearDateStr, memorial.tz)
    const nextYearDate = moment.tz(nextYearDateStr, memorial.tz)

    const diff = currentYearDate.diff(this.today, 'days')
    let anniv;
    if (diff === 0) {
      anniv = currentYearDate.diff(this.startingDayVan, 'year')
      return `🎉${anniv}周年です`
    } else if (diff < 0) {
      anniv = nextYearDate.diff(this.today, 'days')
      return `次の記念日まで${anniv}日です`
    } else {
      anniv = diff
      return `次の記念日まで${anniv}日です`
    }
  }

  get_morning_message(callback) {
    return callback(this.getNextMemorial())
  }

  // Instant interface
  static get_morning_message(callback) {
    const memorial = new Memorial()
    return memorial.get_morning_message(callback)
  }
}

module.exports = (robot => {

  const memorial = new Memorial()
  return memorial.start(robot)

})

module.exports.Memorial = Memorial