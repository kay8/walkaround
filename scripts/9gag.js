// Description:
//   from https://hubot-script-catalog.herokuapp.com/
//
// Dependencies:
//   "htmlparser": "1.7.7"
//   "soupselect": "0.2.0"
//   "request"
//
// Configuration:
//   HUBOT_9GAG_NO_GIFS (optional, skips GIFs if defined; default is undefined)
//
// Commands:
//   hubot 9gag - Returns a random meme image
//
// Author:
//   EnriqueVidal
//
// Contributors:
//   dedeibel (gif support)
//   Kay (convert to ES6 and simplify functionality)

const Select      = require( "soupselect" ).select
const HTMLParser  = require("htmlparser")
const request = require('request')

const url = "https://9gag.com/random"

class Ninegag {

  start(robot) {
    return robot.respond(/9gag/i, res => this.request_meme(res))
  }

  request_meme(res) {
    return request.get(url, (error, response, body) => {

      if (!error && (response.statusCode === 200)) {
        console.log("Request success.")

        const selectors = ["a img.badge-item-img"]
        if ((process.env.HUBOT_9GAG_NO_GIFS == null)) {
          selectors.unshift("div.badge-animated-container-animated img")
        }

        let img_src = this.get_meme_image(body, selectors)
        if (img_src.substr(0, 5) !== "https") {
          img_src = `https:${img_src}`
        }

        const img_title = this.get_meme_title(body, [".badge-item-title"])

        return res.send(img_title, img_src)

      } else {
        console.log("Request error.")
        return res.send('Request error.')
      }
    })
  }

  select_element(body, selectors) {
    const html_handler  = new HTMLParser.DefaultHandler((function(){}), {ignoreWhitespace: true} )
    const html_parser   = new HTMLParser.Parser(html_handler)

    html_parser.parseComplete(body);
    for (let selector of Array.from(selectors)) {
      const img_container = Select(html_handler.dom, selector)
      if (img_container && img_container[0]) {
        return img_container[0]
      }
    }
  }

  get_meme_image(body, selectors) {
    return this.select_element(body, selectors).attribs.src
  }

  get_meme_title(body, selectors) {
    return this.select_element(body, selectors).children[0].raw
  }

}

module.exports = (robot => {

  const ninegag = new Ninegag()
  return ninegag.start(robot)

})

module.exports.Ninegag = Ninegag