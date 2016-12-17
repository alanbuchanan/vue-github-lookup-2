<template>
  <div class="container">
    <h1 v-if="username" v-text="username"></h1>
    <img v-if="avatar" :src="avatar" class="avatar">
    <h2 v-if="faveLang">😍 Favourite Language: {{faveLang}} 😍</h2>
    <h3 v-if="followers.length > 0">Followers ({{followers.length}}):</h3>
    <ul v-if="followers.length > 0">
      <li v-for="follower in followers">
        {{follower}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: [
      'username',
      'avatar',
      'faveLang',
      'followers'
    ]
  }
</script>

<style lang="stylus" scoped>
h1
  font-size 44px

.avatar
  height 200px
  width 200px
  border-radius 10%

.container
  display flex
  align-items center
  flex-flow column
  font-family Comic Sans MS

</style>
