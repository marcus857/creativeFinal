<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
      <fieldset>
        <legend>Comment</legend>
        <input placeholder="Type Comment Here" v-model="comment">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="postComment">Post Comment</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CommentPage',
  data() {
    return {
      comment: '',
    }
  },
    methods: {
    async postComment() {
      try{
let response = await axios.post('/api/comments', {
          comment: this.comment, 
        });
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
    },
       
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 120px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>