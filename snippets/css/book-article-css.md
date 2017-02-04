---
title: 十分不错的书籍格式化css样式
---

```
/* screen.css -- screen stylesheet for jblevins.org
 *
 * Copyright (C) 2002-2010 Jason R. Blevins <jrblevin@sdf.org>
 */

html {
  margin: 0;
  padding: 0;
  height: 100%;                 /* force scrollbar */
  margin-bottom: 1px;
}

body {
  margin: 0 auto;
  padding: 0;
  font-size: 1em;
  line-height: 1.6;
  font-family: Georgia, serif;
  color: #222;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Palatino, Garamond, Times, Georgia, serif;
  font-weight: normal;
  font-style: normal;
  font-size: 1em;
  line-height: 1.2;
}

h1 {
  font-size: 2.4em;
  clear: left;
  text-align: left;
}

h1 a,
h2 a {
  text-decoration: none;
  color: inherit;
}

h1 a:hover,
h2 a:hover {
  color: #555;
  text-decoration: underline;
}

h2 {
  font-size: 1.6em;
  clear: left;
}

h1[id]:hover:after,
h2[id]:hover:after {
  content: " #" attr(id);
  color: #777;
}

h3 {
  font-size: 1.2em;
  clear: left;
}

/* pre, code, kbd, and blockquote */
pre,
code,
kbd,
blockquote {
  background-color: #eee;
  border: 1px solid #ccc;
  font-size: 0.9em;
}

pre,
code,
kbd {
  font-family: "Inconsolata","Monaco","Consolas","Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;
}

pre {
  padding: 0.5em;
  overflow: auto;
}

code,
kbd {
  padding: 0 0.3ex;
}

pre > code {
  border: none;
  padding: 0;
}

blockquote {
  border-left: thick solid #ccc;
  padding: 0 1em;
}

hr {
  border: none;
  border-top: thin solid #ccc;
}

table {
  border-top: double black;
  border-bottom: thin solid black;
  border-spacing: 0;
  margin: 0 auto;
}

th {
  border-bottom: thin solid black;
}

td {
  padding: 0 0.5em;
}

table.plain {
  border-top: none;
  border-bottom: none;
}

table.plain th {
  border-bottom: none;
}

dd {
  margin-left: 1.5em;
}

merror {
  display: inline;
  font-size: 1em;
}

math[display=block] {
  overflow: auto;
  margin: 0.75em 0;
}

math {
  white-space: nowrap;
}

.eq-number {
  float: right;
}

/* footnotes */
a.noteref {
  font-size: 0.7333em;
  vertical-align: super;
}

#notes > li > p {
  display: inline;
}

/* images */
p img {
  float: right;
  padding-left: 1em;
}

div.image {
  text-align: center;
  margin: 2em;
}

div.image img {
  border: thin solid #ccc;
  padding: 2px;
}

div.image p {
  margin:0;
}

div.image p strong {
  display: block;
}

/* meta content */
.meta {
  font-family: sans;
  font-size: 0.875em;
}

.meta,
.meta a:link,
.meta a:visited {
  color: #888;
}

.meta a:hover {
  color: #444;
}

h1 + div.dateline  {
  position: relative;
  top: -1.5em;
  text-transform: uppercase;
}

#mathml-notice {
  float: right;
  width: 11em;
  border: thin solid #ccc;
  margin-left: 1.0em;
  font-size: 0.8em;
  padding: 0.5em;
}

#mathml-notice img {
  float: left;
  margin: 0;
  padding: 0;
  margin-right: 0.5em;
}

/* error pages */
.error .icon {
  float: left;
  font-size: 4em;
  line-height: 1em;
  margin-right: 0.2em;
  color: #900;
}

/* code */
code .selector,
code .difflines,
code .function,
code .bold,
code .keyword {
  font-weight: bold;
}

code .comment,
code .preproc,
code .italics,
code .value {
  font-style: italic;
}

code .string,
code .regexp,
code .character,
code .number {
  color: #444;
}

code .math,
code .comment,
code .preproc {
  color: #666;
}

code .oldfile {
  color: #600;
}

code .newfile {
  color: #060;
}

/* named divs */
#wrap {
  width: 40em;
  height: auto;
  margin: 0 auto;
  padding: 0;
}

#header {
  width: 100%;
  height: 2em;
  float: left;
  margin-top: 0.25em;
}

#header #path {
  width: 60%;
  float: left;
}

#header #nav {
  width: 40%;
  float: right;
  text-align: right;
}

#content {
  width: 100%;
  float: left;
  text-align: justify;
}

#footer {
  width: 100%;
  float: left;
  padding: 2em 0;
}
```
