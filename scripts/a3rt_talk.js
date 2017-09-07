/*!
 * Description:
 * A3RT API using script
 */

'use strict';

const request = require('request')

const API_KEY = process.env.HUBOT_RECRUIT_A3RT_API_KEY
const endPoint = 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk'


class A3rt {

  start(robot) {

    return robot.respond(/(.*)/i, function(res) {
      const text = res.match[1]
      console.log(`Input text=${text}`)

      return request.post(endPoint,
        { form: { apikey: API_KEY, query: text} },
        function(error, response, body){
          let resObj
          if (!error && (response.statusCode === 200)) {
            console.log("Request success.")
            resObj = JSON.parse(body)
            console.log(resObj)

            return res.reply(resObj.results[0].reply)

          } else {
            console.log("Request error.")
            resObj = JSON.parse(body)
            console.log(resObj)

            return res.reply('Request error.')
          }
      })
    })
  }

}

module.exports = (robot => {

  const a3rt = new A3rt()
  return a3rt.start(robot)

})

module.exports.A3rt = A3rt