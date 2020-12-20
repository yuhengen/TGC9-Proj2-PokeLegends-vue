<template>
  <div id="app">
    <!-- Start Navbar -->
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="mx-auto">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" class="ml-5 mr-5">Home</b-nav-item>
            <b-nav-item href="#" class="ml-5 mr-5">About</b-nav-item>
          </b-navbar-nav>

          <b-nav-item href="#" class="ml-5 mr-5">
            <img
              src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
              class="brand-logo"
            />
          </b-nav-item>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="username == ''">
            <b-nav-item href="#" class="ml-5 mr-5" disabled>Pokédex</b-nav-item>
            <b-nav-item
              href="#"
              class="ml-5 mr-5"
              v-b-modal.modal-prevent-closing
              >Login</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item href="#" class="ml-5 mr-5">Pokédex</b-nav-item>
            <b-nav-item-dropdown right class="ml-5 mr-5">
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
    <!-- End navbar -->

    <div class="container">
      <LoginPage />
    </div>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
export default {
  name: "App",
  components: {
    LoginPage,
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
  font-family: pokemonsolid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 30px !important;
  color: rgb(255, 255, 255);
    width: 130px;
    text-align: center;
  }
}
</style>
