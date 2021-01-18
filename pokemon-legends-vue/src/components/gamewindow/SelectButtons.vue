<template>
  <div
    class="btn btn-lg btn-dark btn-design shadow d-flex align-items-center justify-content-center"
  >
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  props: ["message"],
};
</script>

<style scoped>
.btn-design {
  border: 3px solid white !important;
  height: 80px;
  width: 22%;
  font-size: 0.9rem;
}

.btn-design:hover {
  border: 3px solid red !important;
  cursor: pointer;
}

@media only screen and (max-height: 414px) {
  .btn-design {
    height: 70px;
    font-size: 0.7rem;
  }
}
</style>