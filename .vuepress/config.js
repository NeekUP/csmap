module.exports = {
  title: "Roadmaps Light",
  description: "Roadmaps Light",
  themeConfig: {
    search: true,
    searchMaxSuggestions: 20,
    // sidebar: [
    //   {
    //     title:"Programming", 
    //     children:[
    //       ["/programming/","Programming"],
    //       ["/programming/languages/","Javascript"],
    //       ["/tree/","Tree"]
    //     ]
    //   },
    // ],
    nav: [
      { text: 'Map', link: '/tree/' }
    ]
  },
  markdown: {
    lineNumbers: false,
    // plugins: [
    //   'markdown-it-deflist'
    // ],
    // config: md => {
    //   md.use(require('markdown-it-deflist'))
    // },
    // extendMarkdown: md => {
    //   md.use(require('markdown-it-imsize'))
    // }
  },
  plugins: [
    require('./plugins/graph-plugin.js'),
    require('./plugins/findRefs.js'),
  ]
};
