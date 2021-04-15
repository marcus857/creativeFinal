<template>
<div class="home">

  <div class="image">
      <img :src="photo.path" />
      <div class="photoInfo">
        <p class="photoTitle">{{photo.title}}</p>
        <p class="photoName">{{user.firstName}} {{user.lastName}}</p>
      </div>
      <p class="photoDate">{{formatDate(photo.created)}}</p>
      <p class="photoTitle">{{photo.description}}</p>
      
    </div>
  <p v-if="error">{{error}}</p>

  <Comment :comments ="comments" />
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Login from '@/components/Login.vue';
import Comment from '@/components/Comment.vue';
export default {
      components: {
          Login,
          Comment,
      },

  name: 'Home',
    data() {
    return {
      photo: [],
      comments: [],
      error: '',
    }
  },

    async created() {
    try {
         this.getPhoto();
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get(`/api/photos/${this.$route.params.id}`);
        this.photo = response.data;

    
      } catch (error) {
        this.error = error.response.data.message;
      }
    },


     formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  },
    computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
