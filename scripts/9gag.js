// Description:
//   None
//
// Dependencies:
//   "htmlparser": "1.7.7"
//   "soupselect": "0.2.0"
//
// Configuration:
//   HUBOT_9GAG_NO_GIFS (optional, skips GIFs if defined; default is undefined)
//
// Commands:
//   hubot 9gag me - Returns a random meme image
//
// Author:
//   EnriqueVidal
//
// Contributors:
//   dedeibel (gif support)

const Select      = require( "soupselect" ).select
const HTMLParser  = require("htmlparser")

module.exports = robot=>

  robot.respond(/9gag( me)?/i, message=>
    send_meme(message, false, (title, src)=> message.send(title, src))
  )

var send_meme = function(message, location, response_handler){
  let url
  const meme_domain = "http://9gag.com"
  if (!location) {
    location = "/random"
  }
  if (location.substr(0, 4) !== "http") {
    url = meme_domain + location
  } else {
    url = location
  }

  return message.http( url ).get()(function(error, response, body) {
    if (error) {
      return response_handler("Sorry, something went wrong")
    }

    if (response.statusCode === 302) {
      location = response.headers['location']
      return send_meme( message, location, response_handler )
    }

    const selectors = ["a img.badge-item-img"]
    if ((process.env.HUBOT_9GAG_NO_GIFS == null)) {
      selectors.unshift("div.badge-animated-container-animated img")
    }

    let img_src = get_meme_image( body, selectors );
    if (img_src.substr(0, 4) !== "http") {
      img_src = `http:${img_src}`
    }

    const img_title = escape_html_characters( get_meme_title( body, [".badge-item-title"] ) )

    return response_handler(img_title, img_src)
  })
}

const select_element = function(body, selectors){
  const html_handler  = new HTMLParser.DefaultHandler((function(){}), {ignoreWhitespace: true} )
  const html_parser   = new HTMLParser.Parser(html_handler)

  html_parser.parseComplete(body);
  for (let selector of Array.from(selectors)) {
    const img_container = Select( html_handler.dom, selector )
    if (img_container && img_container[0]) {
      return img_container[0]
    }
  }
};

var get_meme_image = ( body, selectors )=> select_element(body, selectors).attribs.src

var get_meme_title = ( body, selectors )=> select_element(body, selectors).children[0].raw

var escape_html_characters = function(text){
  const replacements = [
    [/&/g, '&amp;'],
    [/</g, '&lt;'],
    [/"/g, '&quot;'],
    [/'/g, '&#039;']
  ];

  for (let r of Array.from(replacements)) {
    text = text.replace(r[0], r[1])
  }
  return text;
}