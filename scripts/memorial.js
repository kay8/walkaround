/*!
 * Description:
 * Memorial Information
 */

'use strict';

const moment = require('moment-timezone');

class Memorial {
  start(robot) {
    const starting_day_van = moment.tz('2017-07-30 23:31', 'America/Vancouver');
    // const starting_day_ja = moment.tz(starting_day_van, 'Japan');
    const today = moment().tz('America/Vancouver');
    const days = today.diff(starting_day_van, 'days');

    return robot.hear(/記念日/i, res => res.send(`🎉 付き合い始めてから${days}日目😎`));
  }
}

module.exports = (robot => {

  const memorial = new Memorial();
  return memorial.start(robot);
})

module.exports.Memorial = Memorial;