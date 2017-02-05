<template>
  <div class="snippets">
    <div class="snippets-tags">
      <ul class="list-inline">
        <li v-for="tag in tags">
          <router-link :to="'/snippets/' + tag">[{{ tag }}]</router-link>
        </li>
      </ul>
    </div>

    <div class="snippets-search">
      <input type="text" placeholder="搜索关键字" v-model="keyword">
    </div>

    <div class="snippets-items">
      <ul>
        <li v-for="item in snippets">
          <router-link :to="item.url">{{ item.title }}</router-link>
          <span class="label" v-show="keyword.trim()">{{ item.tag }}</span>
        </li>
      </ul>
    </div>
    <div class="snippets-snippets" id="snippet-content" v-html="content" v-show="!keyword.trim()">
    </div>
  </div>
</template>

<script>
import snippets from '../../snippets/data.json'
import 'whatwg-fetch'
import router from '../router'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  name: 'hello',
  data () {
    return {
      currTag: 'article',
      content: '',
      keyword: ''
    }
  },
  computed: {
    snippets () {
      const keyword = this.keyword.trim().toLowerCase()
      if (keyword) {
        return snippets.filter(item => item.title && item.title.toLowerCase().indexOf(keyword) > -1)
      } else {
        return snippets.filter(item => item.tag === this.currTag)
      }
    },
    tags () {
      return snippets.reduce((prev, curr) => {
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
          this.$nextTick(() => {
            const codes = document.querySelector('#snippet-content').querySelectorAll('pre code')
            for (var i = 0; i < codes.length; i++) {
              hljs.highlightBlock(codes[i])
            }
          })
        }).catch(err => {
          console.log(err)
          router.replace('/snippets/' + this.currTag)
        })
    },
    initData () {
      this.content = ''
      this.keyword = ''

      if (this.tags.indexOf(this.$route.params.tag) < 0) {
        router.replace('/snippets/' + this.tags[0])
      }

      this.toggleTag(this.$route.params.tag)
      if (this.$route.params.title) {
        this.loadContent(this.$route.path)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  ul {
    list-style: none;
  }
  .list-inline li {
    display: inline-block;
    cursor: pointer;
  }

  .snippets-tags {
    text-align: center;
    .router-link-active {
      color: red;
    }
  }

  .snippets-items {
    .router-link-active {
      color: red;
    }
  }

  .label {
    background: #efefef;
    border-radius: 3px;
    padding: 0 4px;
    font-size: 12px;
  }
</style>
