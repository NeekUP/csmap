const fs = require('fs');

var pageList = []

var setTitle = function (page) {
  if (page.frontmatter.name) {
    page.frontmatter.title = page.frontmatter.name
  }
}

var setTags = function (page) {
  if (page.frontmatter.name) {
    var nameWords = page.frontmatter.name.split('/[\s:-_]/')
    if (!page.frontmatter.tags)
      page.frontmatter.tags = []

    page.frontmatter.tags.push(...nameWords)
  }
}

var addToList = function (page) {
  if (page.frontmatter.type) {
    pageList.push({
      type: page.frontmatter.type,
      name: page.frontmatter.name,
      id: page.frontmatter.id,
      url: page.path
    })
  }
}

module.exports = (options = {}, context) => ({
  extendPageData($page) {
    setTitle($page)
    setTags($page)
    addToList($page)
  },

  async ready() {
    fs.writeFileSync("refs.json",JSON.stringify(pageList))
  },
})