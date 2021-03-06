import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {

  fetchFollowers (user) {
    return new Promise((resolve, reject) => {
      resolve(
        Vue.axios.get(`https://api.github.com/users/${user}/followers`).then(followersResponse => {
          return followersResponse.data.map(follower => {
            return follower.login
          })
        })
      )
    })
  },

  fetchLanguages (user) {
    return new Promise((resolve, reject) => {
      resolve(
        Vue.axios.get(`https://api.github.com/users/${user}/repos`).then(reposResponse => {
          return reposResponse.data.map(repo => {
            return repo.language
          })
        })
      )
    })
  }

}
