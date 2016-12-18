import Vue from 'vue'
import UserForm from 'src/components/UserForm'

describe('UserForm.vue', () => {
  it('should have a data-attribute in the button outerHTML', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(UserForm)
    })
    expect(vm.$el.querySelector('.button').outerHTML)
      .to.include('data-v')
  })
})
