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
    <footer class="site-footer">
      <div class="d-flex justify-content-center socials-bar">
        <div class="mr-3">
          <img
            src="https://vignette.wikia.nocookie.net/bondlegends/images/0/00/Pkmn_Legends_Reboot.png/revision/latest/scale-to-width-down/340?cb=20150827225946"
            style="width: 150px"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center ml-3">
            <span style="color:white">Copyright© 1998-2021 The Pokémon Company ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
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

@font-face {
  font-family: pixelfont;
  src: url("./assets/fonts/PressStart2P-vaV7.ttf");
}

/* Shared scrollbar design */

/* width */

::-webkit-scrollbar {
  width: 10px;
}

/* Track */

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */

::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* End Scrollbar CSS */

.container {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding-top: 30px !important;
  padding-bottom: 50px !important;
  padding-left: 2vw;
  padding-right: 2vw;
}

.bgImg {
  position: fixed;
  left: 0px;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -10;
}

.site-footer {
  background-color: #343a40;
  padding: 10px;
  z-index: 9;
}
</style>
