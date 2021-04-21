<template>
<div class="home">

  <ProductList v-if="user" :products="products" />
   <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import Login from '@/components/Login.vue';
export default {
  name: 'Home',
  components: {
    ProductList,
    Login
  },
    data() {
    return {
      photos: [],
      error: '',
      searchText: '',
      projects: [],
      project: null,
      projectName: '',
    }
  },
  
  async created() {
     
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
  computed: {
      user() {
      return this.$root.$data.user;
    },
  
  products() {
    return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
  }
  },


  
      activeItems() {
      return this.items.filter(item => {
        return !item.completed;
      });
    },
    filteredItems() {
      if (this.show === 'active')
        return this.items.filter(item => {
          return !item.completed;
        });
      if (this.show === 'completed')
        return this.items.filter(item => {
          return item.completed;
        });
      return this.items;
    },
        cart() {
      return this.$root.$data.cart.length;
    },
}
</script>
