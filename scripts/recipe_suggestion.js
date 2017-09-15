/*!
 * Description:
 * Suggest Recipes based on keywords
 */

'use strict';

const request = require('request')
const fs = require('fs')

const url = process.env.HUBOT_GAS_API_URL

class Recipes {

  constructor(options) {

  }

  start(robot) {
    return robot.respond(/recipes/i, res => this.get_recipes(res))
  }

  get_recipes(res) {
    return request.get(url, (error, response, body) => {

      if (!error && (response.statusCode === 200)) {
        console.log("Request success.")
        //console.log(JSON.parse(body))
        console.log(body)

      } else {
        console.log("Request error.")
        return res.send('Request error.')
      }
    })
  }

}

module.exports = (robot => {

  const recipes = new Recipes()
  return recipes.start(robot)

})

module.exports.Recipes = Recipes