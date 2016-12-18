<template>
  <form @submit.prevent="handleSubmit">
    <input
      class="input"
      :value="inputValue"
      @input="updateValue($event.target.value)"
      type="text"
      placeholder="Enter a GitHub username..."
    >
    <button class="button">Go!</button>
  </form>
</template>

<script>
export default {
  props: ['inputValue'],
  name: 'user-form',
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    handleSubmit () {
      this.$emit('go')
    }
  }
}
</script>

<style lang="stylus" scoped>

input
  width 320px

input,
button
  font-size 25px

form
  display flex
  justify-content center

</style>
