/*!
 * Description:
 * Suggest Recipes based on keywords
 */

'use strict';

class Recipes {

  constructor(options) {

  }

  start(robot) {
    return robot.respond(/(.*)/i, function(res) {

    })
  }

}

module.exports = (robot => {

  const recipes = new Recipes()
  return recipes.start(robot)

})

module.exports.Recipes = Recipes