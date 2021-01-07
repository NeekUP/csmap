const fs = require('fs');
const path = require('path');
const process = require('process')
const readline = require('readline');
const util = require('util');
const root = "./programming"
const topicFile = "README.md";
const slash = require('slash');

var isTopicFolder = function (fn) {
    return fn && path.basename(fn) == topicFile
}

var getValue = function (line){
    var parts = line.split(":", 2)
    if (parts.length == 2) {
        return parts[1].trim();
    }
    return null
}

var parseTopicFile = function (lines) {
    /* 
    0 - ready, 
    1 - inside description, 
    2 - exit from block*/
    var state = 0;
    var info = null
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        switch (state) {
            case 0:
                if (line.startsWith('---')) state = 1;
                break;
            case 1:
                if (info == null)
                    info = {}

                if (line.startsWith('type')) {
                    info.type = getValue(line);
                } else if (line.startsWith('name')) {
                    info.name = getValue(line);
                } else if (line.startsWith('---')) {
                    state = 2
                }
                break;
            case 2:
                if (info.type === 'topic')
                    return info;
                else
                    return null;
        }
    }

    return info;
}

var dirTree = function (filename, root) {
    var stats = fs.lstatSync(filename);


    if (stats.isDirectory()) {
        var info = {
            url: slash(filename.substring(root.length)) + "/",
            name: path.basename(filename)
        };

        var readme = path.join(filename, "README.md");
        if (fs.existsSync(readme)) {
            var lines = fs.readFileSync(readme, 'utf-8').split('\n');
            var fileInfo = parseTopicFile(lines);
            if (fileInfo.name) {
                info.name = fileInfo.name
            }
        }
        var child = fs.readdirSync(filename);

        info.children = [];
        child.forEach(function (c) {
            if (c != null) {
                var tree = dirTree(path.join(filename, c), root);
                if (tree != null)
                    info.children.push(tree)
            }
        });


        return info;
    }

    return null;
}

module.exports = {
    async ready() {
        console.log("ready")
        var ignoredDirs = [".vuepress", "node_modules", "tree", ".git"]
        var workDir = process.cwd()
        var children = fs.readdirSync(workDir).map(function (child) {
            return path.join(workDir, child);
        });

        var map = [];
        children.forEach(function (ch) {
            var name = ch.substring(workDir.length + 1)
            if (!ignoredDirs.includes(name) && fs.lstatSync(ch).isDirectory()) {
                map.push(dirTree(ch, workDir))
            }
        });
        var json = JSON.stringify(map);
        fs.writeFileSync(path.join(workDir, "tree/map.json"), json)
    },

}
