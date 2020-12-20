<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>Username</label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label>Email</label>
      <input type="email" v-model="email" />
    </div>
    <!-- <div>
      <button @click="loginAccount" class="mt-3">Login</button>
    </div> -->
    <div>
      <button @click="registerAccount" class="mt-3">Register</button>
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
      email: "",
    };
  },
  created: async function () {
    let response = await axios.get(
      "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata"
    );
    this.userdata = response.data;
  },
  methods: {
    registerAccount: async function () {
      await axios.post(
        "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata",
        {
          username: this.username,
          email: this.email,
        }
      );

      this.username = "";
      this.email = "";
      alert("New account has been registered!");
    },
  },
};
</script>

<style scoped>
</style>