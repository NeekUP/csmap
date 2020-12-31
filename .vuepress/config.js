module.exports = {
  title: "Roadmaps Light",
  description: "Roadmaps Light",
  themeConfig: {
    lastUpdated: 'Last Updated',
    search: true,
    searchMaxSuggestions: 20,
    nav: [
      { text: 'Map', link: '/tree/' }
    ]
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    require('./plugins/buildTree.js'),
    require('./plugins/findRefs.js'),
    require('./plugins/createPages.js'),
  ]
};
