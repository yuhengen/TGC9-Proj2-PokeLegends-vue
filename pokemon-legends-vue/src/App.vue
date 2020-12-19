<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="mx-auto">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" class="ml-4 mr-4">Home</b-nav-item>
            <b-nav-item href="#" class="ml-4 mr-4">About</b-nav-item>
          </b-navbar-nav>

          <b-nav-item href="#" class="ml-4 mr-4">
            <img
              src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
              class="brand-logo"
            />
          </b-nav-item>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="username == ''">
            <b-nav-item href="#" class="ml-4 mr-4" disabled>Pokédex</b-nav-item>
            <b-nav-item href="#" class="ml-4 mr-4">Login</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item href="#" class="ml-4 mr-4">Pokédex</b-nav-item>
            <b-nav-item-dropdown right class="ml-4 mr-4">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="container">
      <GameWindow />
    </div>
  </div>
</template>

<script>
import GameWindow from "./components/GameWindow";
export default {
  name: "App",
  components: {
    GameWindow,
  },
  data: function () {
    return {
      username: "",
    };
  },
};
</script>

<style>
@font-face {
  font-family: pokemonsolid;
  src: url("./assets/fonts/Pokemon-Solid.ttf");
}

.navbar {
  height: 70px;
}

.navbar-brand {
  font-family: pokemonsolid;
  text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  font-size: 40px !important;
}

.nav-item {
  font-size: 20px !important;
}

.brand-logo {
  height: 90px;
}

@media (min-width: 768px) {
  .nav-item {
    width: 150px;
  }
}
</style>
