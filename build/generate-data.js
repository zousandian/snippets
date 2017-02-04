const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const parser = require('front-matter')
const showdown  = require('showdown')
const converter = new showdown.Converter()

const diretoryTreeToObj = function(dir, done) {
  var results = []

  fs.readdir(dir, function(err, list) {
    if (err)
      return done(err)

    var pending = list.length

    if (!pending)
      return done(null, {name: path.basename(dir), type: 'folder', children: results})

    list.forEach(function(file) {
      if (file.indexOf('.') === 0) return --pending
      file = path.resolve(dir, file)
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function(err, res) {
            results.push({
              name: path.basename(file),
              type: 'folder',
              children: res
            })
            if (!--pending)
              done(null, results)
          })
        }
        else {
          if (path.extname(file) !== '.md') return --pending
          var content = fs.readFile(file, 'utf8', function (err, data) {
            const content = parser(data)
            results.push({
              type: 'file',
              name: path.basename(file, '.md'),
              title: content.attributes.title
            })

            // markdown to html
            const filePath = path.resolve(path.join('../static/snippets/',dir.split('snippets').pop(), path.basename(file, '.md')) + '.html')
            const fileDir = path.dirname(filePath)
            // console.log(file, filePath)
            if (!fs.existsSync(fileDir)) {
              mkdirp.sync(fileDir)
            }
            fs.writeFileSync(filePath, converter.makeHtml(content.body))

            if (!--pending)
              done(null, results)
          })
        }
      })
    })
  })
}

let data = []
diretoryTreeToObj('../snippets', (err, res) => {
  if (err) {
    console.error('出错啦')
  }
  res.filter(obj => obj.type === 'folder').map(obj => {
    obj.children.map(item => {
      data.push({
        tag: obj.name,
        title: item.title,
        url: `/static/snippets/${obj.name}/${item.name}.html`
      })
    })
  })
  fs.writeFile('../snippets/data.json', JSON.stringify(data), 'utf8', err => {
    if (err) {
      console.error(err)
    }
  })
})

