<template>
  <div class="hello">
    <div class="tags">
      tags:
      <ul class="list-inline">
        <li v-for="tag in tags" @click="toggleTag(tag)">
          <a href="javascript:void(0);">[{{ tag }}]</span>
        </li>
      </ul>
    </div>
    <div class="tag-items">
      <ul>
        <li v-for="item in snippets" v-if="currTag === item.tag">
          <a href="javascript:void(0);" @click="loadContent(item.url)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="content" v-html="content">
    </div>
  </div>
</template>

<script>
import snippets from '../../snippets/data.json'
import 'whatwg-fetch'

export default {
  name: 'hello',
  data () {
    return {
      snippets: snippets,
      currTag: 'article',
      content: ''
    }
  },
  computed: {
    tags () {
      return this.snippets.reduce((prev, curr) => {
        if (prev.indexOf(curr.tag) < 0) {
          return [...prev, curr.tag]
        } else {
          return prev
        }
      }, [])
    }
  },
  methods: {
    toggleTag (tag) {
      console.log(tag)
      this.currTag = tag
    },
    loadContent (url) {
      console.log(url)
      fetch(url).then(res => {
        return res.text()
      }).then(body => {
        this.content = body
      })
    }
  }
}
</script>
<style scoped>
  ul {
    list-style: none;
  }
  .list-inline li {
    display: inline-block;
    cursor: pointer;
  }
</style>
