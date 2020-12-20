<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>Username</label>
      <input type="text" v-model="username" />
      <button @click="updateTask" class="mt-3">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userdata: [],
      username: "",
    };
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/"
    );
    this.userdata = response.data;
  },
};
</script>

<style scoped>
</style>