<template>
  <div id="app">
    <!-- Start Navbar -->
    <NavBar />
    <!-- End navbar -->

    <!-- Background Image -->
    <img
      src="https://images.wallpapersden.com/image/download/pokemon-pikachu-art_a25tbW6UmZqaraWkpJRmbmdlrWZlbWU.jpg"
      class="bgImg"
      alt="Pikachu Background"
    />
    <!-- End Background image -->

    <div class="container">
  <h1 v-text="pagetitle">{{ $route.meta.title }}</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@font-face {
  font-family: pokemonsolid;
  src: url("./assets/fonts/Pokemon-Solid.ttf");
}

.container {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding-top: 30px !important;
  padding-bottom: 50px !important;
  padding-left:2vw;
  padding-right:2vw;
}

.bgImg {
  position: fixed;
  left:0px;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -10;
}
</style>
<style scoped>
</style>
