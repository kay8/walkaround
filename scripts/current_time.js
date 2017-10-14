//
// Description:
// Tell partner's time
//

'use strict';

const moment = require('moment-timezone')
const tz_format = 'h:mmA ddd' // https://momentjs.com/docs/#/displaying/format/
const tz = {
  van: 'America/Vancouver',
  jp: 'Asia/Tokyo',
}
const users = {
  jp: process.env.HUBOT_SLACK_USER_JP,
  van: process.env.HUBOT_SLACK_USER_VAN,
}

class CurrentTime {

  constructor(options) {
  }

  start(robot) {
    return robot.hear(/^何時$/i, res => this.get_current_time(res))
  }

  get_current_time(res) {
    const user_name = res.message.user.name
    let formatted_time = ''
    if (user_name === users.jp) {
      formatted_time = moment().tz(tz.van).format(tz_format)
      return res.reply(`バンクーバーは${formatted_time}だよ`)
    } else if (user_name === users.van) {
      formatted_time = moment().tz(tz.jp).format(tz_format)
      return res.reply(`日本は${formatted_time}だよ`)
    }
  }

}

module.exports = (robot => {

  const current_time = new CurrentTime()
  return current_time.start(robot)

})

module.exports.CurrentTime = CurrentTime