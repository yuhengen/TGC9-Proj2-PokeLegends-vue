<template>
  <div id="app">
    <!-- Start Navbar -->
    <NavBar />
    <!-- End navbar -->

    <div class="container">
      <RegisterPage />
    </div>
  </div>
</template>

<script>
import RegisterPage from "./components/RegisterPage";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    RegisterPage,
    NavBar,
  },
};
</script>

<style>
@font-face {
  font-family: pokemonsolid;
  src: url("./assets/fonts/Pokemon-Solid.ttf");
}
</style>
