module.exports = (options = {}, context) => ({
  extendPageData($page) {
    var name = $page.frontmatter.name;
    if (name) {

      var nameWords = name.split('/[\s:-_]/')
      if (!$page.frontmatter.tags)
        $page.frontmatter.tags = []

      $page.frontmatter.tags.push(...nameWords)
      $page.frontmatter.title = name
      //console.log($page.frontmatter)
    }
    //console.log($context)
  }
})