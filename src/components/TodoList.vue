<template>
  <div>
    <h1>todo</h1>
    <div class="card" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span @click="updatedTodo(todo)" :class="{completed: todo.completed}">{{todo.title}}</span>
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import jwtDecode from 'jwt-decode'
export default {
  name: 'Todolist',
  props: {
    todos: Array, 
  },
  computed: {
    requestHeader: function(){
      return this.$store.getters.requestHeader
    },
    userId(){
      return this.$store.getters.userId
    }
  },
  methods: {
    deleteTodo: function(todo){
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const requestHeader = {
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }

      axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}/`, this.requestHeader)
      .then((res)=>{
        console.log(res)
        const targetTodo = this.todos.find(function(el){
          return el === todo
        })

        const idx = this.todos.indexOf(targetTodo)
        if (idx > -1) {
        this.todos.splice(idx, 1)
        }

      })
      .catch((e)=>{
        console.log(e)
      })
    },
    updatedTodo(todo){
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const decodedToken = jwtDecode(token)
      // const user_id = decodedToken.user_id
      
      // const requestHeader = {
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }

      const requestForm = new FormData()
      requestForm.append('user', this.userId)
      requestForm.append('title', todo.title)
      requestForm.append('completed', !todo.completed)

      axios.put(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestForm, this.requestHeader)
      .then((res)=>{
        console.log(res)
        todo.completed = !todo.completed
      })
      .catch((e)=>{
        console.log(e)
      })
    }

  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
  color:dimgray
}
</style>