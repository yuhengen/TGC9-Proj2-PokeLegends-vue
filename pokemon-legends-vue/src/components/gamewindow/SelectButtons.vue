<template>
  <div class="btn btn-lg btn-dark btn-design">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    };
  },
  props: ["message"],
};
</script>

<style scoped>
.btn-design {
  padding-top: 20px;
  border: 3px solid white !important;
  width: 22%;
  font-size:0.9rem;
}
</style>