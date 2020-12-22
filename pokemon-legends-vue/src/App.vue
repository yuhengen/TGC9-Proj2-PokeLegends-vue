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
          <b-navbar-nav class="ml-auto" v-if="loginUser == ''">
            <b-nav-item href="#" class="ml-5 mr-5" disabled>Pokédex</b-nav-item>
            <b-nav-item href="#" class="ml-5 mr-5" v-b-modal.modal-center
              >Login</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item href="#" class="ml-5 mr-5">Pokédex</b-nav-item>
            <b-nav-item-dropdown right class="ml-5 mr-5">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{loginUser}}</em>
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

    <!-- Login Modal -->
    <b-modal
      id="modal-center"
      centered
      title="Login"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Username"
          label-for="username-input"
          invalid-feedback="Invalid username"
          :state="usernameState"
        >
          <b-form-input
            id="username-input"
            v-model="username"
            :state="usernameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <!-- End Login Model -->
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
// import axios from "axios";

export default {
  name: "App",
  components: {
    LoginPage,
  },
  data: function () {
    return {
      username: "",
      usernameState: null,
      loginUser: "",
    };
  },
  methods: {
    //   Login Modal
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.usernameState = valid;
      return valid;
    },
    resetModal() {
      this.username = "";
      this.usernameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.loginUser = this.username;
      
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-center");
      });

      //   const response = await axios.post(
      //     "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/login",
      //     {
      //       username: this.username,
      //     }
      //   );
      //   console.log("res", response);

      //   if (response.data === "User is not found") {
      //     console.log(response.data);
      //   } else {
      //   }
    },
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

.navbar a {
  color: white !important;
  font-family: pokemonsolid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 30px !important;

  text-align: center;
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
}
</style>
