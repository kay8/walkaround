//
// Description:
// Suggest Recipes based on keywords
//

'use strict';

const request = require('request')
const fs = require('fs')

const url = process.env.HUBOT_GAS_API_URL

class Recipes {

  constructor(options) {

  }

  start(robot) {
    return robot.respond(/レシピ/i, res => this.get_recipes(res))
  }

  get_recipes(res) {
    return request.get(url, (error, response, body) => {

      if (!error && (response.statusCode === 200)) {
        console.log("Recipes Request success.")
        console.log(JSON.parse(body))

        const text = res.match[1]
        const recipes = JSON.parse(body)

        this.search_recipes(text, recipes)

      } else {
        console.log(`Recipes Request error: ${response.statusCode}`)
        return res.send(`Recipes Request error: ${response.statusCode}`)
      }
    })
  }

  search_recipes(text, recipes) {

    const requested_recipes = []


  }

}

module.exports = (robot => {

  const recipes = new Recipes()
  return recipes.start(robot)

})

module.exports.Recipes = Recipes