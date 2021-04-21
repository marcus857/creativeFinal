<template>
<div class="dashboard">
  <ProductCart v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import ProductCart from '@/components/ProductCart.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    Login,
    ProductCart,
    
  },
  
  async created() {
     
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
      computed: {
    user() {
      return this.$root.$data.user;
    }
  },

}
</script>