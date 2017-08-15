# Description:
#   Memorial Information

moment = require('moment-timezone')

module.exports = (robot) ->

  starting_day_van = moment.tz('2017-07-30 23:31', 'America/Vancouver')
  #starting_day_ja = moment.tz(starting_day_van, 'Japan')
  today = moment().tz('America/Vancouver')
  days = today.diff(starting_day_van, 'days')

  robot.hear /記念日/i, (res) ->
    res.send '🎉 付き合い始めてから' + days + '日目😎'