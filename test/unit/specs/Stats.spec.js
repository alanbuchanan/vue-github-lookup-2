import Vue from 'vue'
import Stats from 'src/components/Stats'

// Inspect the generated HTML after a state update
it('updates the rendered message when vm.message updates', done => {
  const vm = new Vue(Stats).$mount()
  vm.username = 'foo'
  // wait a "tick" after state change before asserting DOM updates
  Vue.nextTick(() => {
    expect(vm.$el.querySelector('.username').textContent).toBe('foo')
    done()
  })
})
