<template>
  <div class="btn btn-lg btn-dark btn-design">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      //   message: "Placeholder message",
    };
  },
  props: ["message", "btnBgColor"],
};
</script>

<style scoped>
.btn-design {
  margin-top: auto;
  border: 3px solid white !important;
}
</style>