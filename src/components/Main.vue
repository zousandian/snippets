<template>
  <div class="container" :class="{'has-content': content && !keyword}">

    <div class="snippets-tags vux-1px-l">
      <ul class="list-unstyled vux-1px-r">
        <li v-for="(tag, index) in tags" :class="[index > 0 ?'vux-1px-b' : 'vux-1px-tb']">
          <router-link :to="'/snippets/' + tag">{{ tag }}</router-link>
        </li>
      </ul>
    </div>

    <div class="snippets-items">
      <div class="snippets-search">
        <input type="text" placeholder="搜索关键字" v-model="keyword">
      </div>

      <ul class="list-unstyled">
        <li v-for="item in snippets">
          <router-link :title="item.title" :to="item.url">
            {{ item.title }}
            <span class="label" v-show="keyword.trim()">{{ item.tag }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="snippets-content" v-show="!keyword.trim() && content">
      <h2 class="snippet-title">{{ item && item.title }}</h2>
      <div id="snippet-content" v-html="content"></div>
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
      currTag: '',
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
    },
    item () {
      return snippets.find(item => item.url === this.$route.path)
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
  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1280px;
    padding: 10px;
  }
  a {
    text-decoration: none;
  }
  .list-unstyled {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .snippets-tags {
    float: left;
    width: 15%;
    max-width: 100px;
    .router-link-active {
      color: red;
    }
    a {
      display: block;
      padding: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .snippets-items {
    float: left;
    width: 60%;
    max-width: 800px;
    background: whiteSmoke;
    padding: 10px;
    margin: 0 15px;
    .router-link-active {
      color: red;
    }
    a {
      display: block;
      padding: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .snippets-search {
    input {
      height: 28px;
      padding: 10px;
      margin-bottom: 5px;
    }
  }

  .snippets-content {
    overflow: auto;
    padding: 10px;
    border: 1px dashed #aaa;
    .snippet-title {
      margin-bottom: 10px;
    }
  }

  .label {
    background: #dfdfdf;
    border-radius: 3px;
    padding: 0 4px;
    font-size: 12px;
  }

  .has-content {
    .snippets-tags,
    .snippets-items {
      max-height: 600px;
      overflow-y: auto;
    }
    .snippets-items {
      width: 20%;
      max-width: 200px;
    }
  }
</style>
