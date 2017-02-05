<template>
  <div class="hello">
    <div class="tags">
      <ul class="list-inline">
        <li v-for="tag in tags">
          <router-link :to="'/snippets/' + tag">[{{ tag }}]</router-link>
        </li>
      </ul>
    </div>
    <div class="tag-items">
      <ul>
        <li v-for="item in snippets" v-if="currTag === item.tag">
          <router-link :to="item.url">{{ item.title }}</router-link>
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
import router from '../router'

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
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.initData()
  },
  watch: {
    '$route': 'initData'
  },
  methods: {
    toggleTag (tag) {
      console.log(tag)
      this.currTag = tag
    },
    loadContent (url) {
      function checkStatus (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.text()
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      }
      fetch(`/static/${url}.html`)
        .then(checkStatus)
        .then(body => {
          this.content = body
        }).catch(err => {
          console.log(err)
          router.replace('/snippets/' + this.currTag)
        })
    },
    initData () {
      if (this.tags.indexOf(this.$route.params.tag) < 0) {
        router.replace('/snippets/' + this.tags[0])
      }

      this.toggleTag(this.$route.params.tag)
      this.content = ''
      if (this.$route.params.title) {
        this.loadContent(this.$route.path)
      }
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
  .router-link-active {
    color: red;
  }
</style>
