<template>
  <div id="app">
    <user-form
      v-model="inputValue"
      @go="submit"
      :input-value="inputValue"
    />
    <stats
      :username="username"
      :avatar="avatar"
      :faveLang="faveLang"
      :followers="followers"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash'
import UserForm from './components/UserForm'
import Stats from './components/Stats'

Vue.use(VueAxios, axios)

export default {
  name: 'app',

  components: {
    UserForm,
    Stats
  },

  data () {
    return {
      inputValue: '',
      username: '',
      avatar: '',
      followers: [],
      faveLang: '',
      urlBase: 'https://api.github.com/users'
    }
  },

  methods: {
    submit () {
      if (this.inputValue) {
        const api = `${this.urlBase}/${this.inputValue}`

        this.fetchUser(api)
      }
    },

    fetchUser (api) {
      Vue.axios.get(api).then((response) => {
        const { data } = response

        this.inputValue = ''
        this.username = data.login
        this.avatar = data.avatar_url

        this.fetchFollowers()
        this.fetchFaveLang()
      }).catch(error => {
        console.warn('ERROR:', error)
      })
    },

    fetchFollowers () {
      Vue.axios.get(`${this.urlBase}/${this.username}/followers`).then(followersResponse => {
        this.followers = followersResponse.data.map(follower => {
          return follower.login
        })
      })
    },

    fetchFaveLang () {
      Vue.axios.get(`${this.urlBase}/${this.username}/repos`).then(reposResponse => {
        const langs = reposResponse.data.map(repo => {
          return repo.language
        })

        // Get most commonly occurring string from array
        const faveLang = _.chain(langs).countBy().toPairs().maxBy(_.last).head().value()
        if (faveLang !== 'null') {
          this.faveLang = faveLang
        } else {
          this.faveLang = ''
        }
      })
    }
  }
}
</script>

<style lang="stylus">
body
  background-color goldenrod

</style>
