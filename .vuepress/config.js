module.exports = {
  title: "Roadmaps",
  description: null,
  themeConfig: {
    lastUpdated: 'Last Updated',
    repo: 'NeekUP/csmap',
    editLinks: true,
    docsBranch: 'main',
    editLinkText: 'Help us improve this page!',
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
