<template>
  <div class="host-min-h-screen host-flex host-flex-col host-md:flex-row host-bg-slate-50">
    <Login />
  </div>
</template>

<script>
import Login from '../components/forms/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>