module.exports = (options = {}, context) => ({
    extendPageData ($page) {
      var steps = $page.frontmatter.steps;
      if(steps){
        $page._strippedContent = "sdsdsdsd"
        console.log($page)
      }
      //console.log($context)
    }
  })