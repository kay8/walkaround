/*!
 * Description:
 * A3RT API using script
 */

'use strict';

const request = require('request')

class A3rt {

  constructor(options) {
    this.endPoint = 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk'
  }

  start(robot) {
    return this.startConversation(robot)
  }

  startConversation(robot) {
    robot.respond(/(.*)/i, function(res) {
      const text = res.match[1]
      console.log(`Input text=${text}`)

      const options = {
        url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
        form: {apikey: process.env.HUBOT_RECRUIT_A3RT_API_KEY, query: text}
      }
   
      return request.post({options}, function(error, response, body) {
          let resObj
          console.log(options)
          console.log(error)

          if (!error && (response.status === 200)) {
            console.log("Request success.")
            resObj = JSON.parse(body)
            console.log(resObj)

            return res.reply(resObj.results[0].reply)
          } else {
            console.log("Request error.")
            //resObj = JSON.parse(body)
            //console.log(resObj)
            console.log(body)

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