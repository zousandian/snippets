---
title: github API
---
Author: 小胡子哥

Email: barret.china(at)gmail.com

```
var github = require('octonode');
var client = github.client({
  username: 'barretlee',
  password: 'password'
});
var ghrepo = client.repo('barretlee/snippets');
ghrepo.createContents(githubPath, '感谢 ' + fileAuthor + ' 贡献代码', fileContent, 'gh-pages', function(ret){
  console.log(JSON.stringify(arguments, null, 4));
  if(ret["1"] && ret["1"].content) {
    res.write("发送成功");
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write("<pre>" + JSON.stringify(ret, null, 4));
  }
  res.end();
});
```
