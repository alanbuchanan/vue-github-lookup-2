<template>
  <div id="app">
    <user-form
      v-model="inputValue"
      @go="submit"
      :input-value="inputValue"
    ></user-form>
    <stats
      :username="username"
      :avatar="avatar"
      :fave-lang="faveLang"
      :followers="followers"
    ></stats>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash'
import UserForm from './components/UserForm'
import Stats from './components/Stats'
import FetchMethods from './FetchMethods'

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
      urlBase: 'https://api.github.com/users',
      userData: []
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
        this.userData = data

        this.inputValue = ''
        this.username = this.userData.login
        this.avatar = this.userData.avatar_url

        FetchMethods.fetchFollowers(this.username).then((followers) => {
          this.followers = followers
        })

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
