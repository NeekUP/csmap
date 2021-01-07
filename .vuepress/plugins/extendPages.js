const fs = require('fs');

var pageList = []
var treeRoot = null

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

var setTreeRoot = function (name, url) {
  treeRoot = {
    url: url,
    name: name,
    children: []
  }
}

var addToTree = function (page) {
  if (page.frontmatter.type == "topic") {
    var parent = null;
    var parts = page.path.split('/').filter(s => s.length > 0);
    parts.forEach(p => {
      if (parent == null) {
        if (treeRoot == null) {
          setTreeRoot(page.frontmatter.name, `/${p}/`)
        }
        parent = treeRoot;
      } else {
        var url = parent.url + p + '/';
        var exists = parent.children.find(f => f.url == url);
        if (url != page.path) {
          if (exists) {
            parent = exists;
          } else {
            var current = {
              url: url,
              children: []
            }
            parent.children.push(current)
            parent = current
          }
        } else {

          if (exists) {
            exists.name = page.frontmatter.name;
          } else {

            var current = {
              url: url,
              name: page.frontmatter.name,
              children: []
            }
            parent.children.push(current)
            parent = current
          }
        }
      }

    });
  }
}

module.exports = (options = {}, context) => ({
  extendPageData($page) {
    setTitle($page)
    setTags($page)
    addToList($page)
    addToTree($page)
  },

  async ready() {
    fs.writeFileSync("refs.json", JSON.stringify(pageList))
    var treeArray = []
    treeArray.push(treeRoot)
    fs.writeFileSync("tree/map.json", JSON.stringify(treeArray))
  },
})