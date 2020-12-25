<template>
  <div id="app">
    <!-- Start Navbar -->
    <NavBar />
    <!-- End navbar -->

    <!-- Background Image -->
    <img
      src="https://archive-media-1.nyafuu.org/vp/image/1562/29/1562294461462.gif"
      class="bgImg"
      alt="Pikachu Background"
    />
    <!-- End Background image -->

    <div class="container">
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
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding-top: 30px !important;
  padding-bottom: 50px !important;
  padding-left: 5vw;
  padding-right: 5vw;
}

.bgImg {
  position: fixed;
  left: 0px;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -10;
  /* -webkit-transform: scaleX(-1);
  transform: scaleX(-1); */
}
</style>
<style scoped>
</style>
