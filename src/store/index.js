import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '../modules/LocalStorage'

Vue.use(Vuex)

const STORE = new LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    todos: [{ content: 123, done: false }, { content: 345, done: false }, { content: 677, done: false }]
  },
  getters: {
    list (state) {
      return state.todos.map((todo, tId) => {
        return { tId, todo }
      })
    },
    filiterList (state, getter) {
      return (filiter) => {
        let status = null
        switch (filiter) {
          case 'all':
            return getter.list
          case 'active':
            status = false
            break
          case 'done':
            status = true
            break
        }
        return getter.list.filiter((todo) => { return todo.todo.done === status })
      }
    }
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    CREATE_TODO ({ commit }, { todo }) {
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todo)
      commit('SET_TODOS', todos)
      return {
        tId: todos.length - 1,
        todos
      }
    },
    READ_TODO ({ commit }) {
      const todos = STORE.load()
      commit('SET_TODOS', todos)
      return {
        todos
      }
    },
    UPDATE_TODO ({ commit }, { tId, todo }) {
      const todos = STORE.load()
      todos.splice(tId, 1, todo)
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId: null,
        todo
      }
    },
    DELETE_TODO ({ commit }, { tId }) {
      const todos = STORE.load()
      const deleteTodo = todos.splice(tId, 1)[0]
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId: null,
        deleteTodo
      }
    },
    CLEAR_TODO ({ commit }) {
      const todos = []
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return { todos }
    }
  }
})
