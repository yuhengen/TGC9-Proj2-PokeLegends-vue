<template>
  <div>
    <div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userdata: [],
    //   loginUser: "phantomshiro",
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