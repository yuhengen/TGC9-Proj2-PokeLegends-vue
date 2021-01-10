<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="mx-auto">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="mr-4"
              ><router-link to="/">Home</router-link></b-nav-item
            >
            <b-nav-item class="ml-4 mr-4"
              ><router-link to="/pokedex">Pokédex</router-link></b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-brand class="ml-4 mr-4">
            <router-link to="/game">
              <img
                src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
                class="brand-logo"
              />
            </router-link>
          </b-navbar-brand>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="$store.state.loginState == false">
            <b-nav-item class="ml-4 mr-4"
              ><router-link to="/game">Play</router-link></b-nav-item
            >
            <b-nav-item class="ml-4" v-b-modal.loginModal>Login</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item class="ml-4 mr-4"
              ><router-link to="/game">Play</router-link></b-nav-item
            >
            <b-nav-item-dropdown right class="ml-4">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Profile</em>
              </template>
              <span>{{ $store.state.username }}</span>
              <div class="dropdown-divider"></div>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
              <b-dropdown-item @click="logoutAccount">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <!-- Login Modal -->
    <div>
      <b-modal
        id="loginModal"
        centered
        title="Login"
        @show="resetModal"
        @hidden="resetModal"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Username" label-for="username-input">
            <b-form-input
              id="username-input"
              v-model="username"
              required
            ></b-form-input>
            <span class="errorMsg">{{ invalidUser }}</span>
          </b-form-group>
          <b-form-group label="Password" label-for="password-input">
            <b-form-input
              id="password-input"
              v-model="password"
              required
            ></b-form-input>
            <span class="errorMsg">{{ invalidPW }}</span>
          </b-form-group>
        </form>
        <div slot="modal-footer">
          <button class="btn btn-primary modalBtns mr-3" @click="handleSubmit">
            Login
          </button>
          <router-link to="/register"
            ><button
              class="btn btn-secondary modalBtns ml-3"
              @click="handleRegister"
            >
              Register
            </button></router-link
          >
        </div>
      </b-modal>
    </div>
    <!-- End Login Model -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "",
      password: "",
      invalidUser: "",
      invalidPW: "",
    };
  },
  methods: {
    //   Login Modal
    resetModal() {
      this.username = "";
      this.password = "";
      this.invalidUser = "";
      this.invalidPW = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleRegister() {
      this.$nextTick(() => {
        this.$bvModal.hide("loginModal");
      });
    },
    handleSubmit: async function () {
      this.invalidUser = "";
      this.invalidPW = "";

      let response = await axios.get(
        "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata"
      );
      let users = response.data;

      let checkUser = users.find(
        (u) => u.username.toLowerCase() === this.username.toLowerCase()
      );

      if (this.username !== "") {
        if (checkUser !== undefined) {
          if (this.password === checkUser.password) {
            this.$store.state.username = checkUser.username;
            this.$store.state.gameState = "logged_in";
            this.$store.state.loginState = true;

            let response = await axios.get(
              "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata/" +
                this.$store.state.username
            );
            this.$store.state.userData = response.data;

            // Hide the modal manually
            this.$nextTick(() => {
              this.$bvModal.hide("loginModal");
            });
          } else {
            this.invalidPW = "Incorrect password";
          }
        } else {
          this.invalidUser = "Username does not exist";
        }
      } else {
        this.invalidUser = "Username cannot be empty";
      }

      if (this.password === "") {
        this.invalidPW = "Password cannot be empty";
      }
    },
    logoutAccount() {
      this.$store.state.username = "";
      this.$store.state.gameState = "";
      this.$store.state.loginState = false;
      this.$store.state.userData = {};
    },
  }
};
</script>

<style>
.navbar {
  height: 70px;
}

.navbar a,
.navbar em {
  color: white !important;
  font-family: pokemonsolid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 30px;
  text-align: center;
  padding-bottom: 20px !important;
}

.navbar-brand {
  font-family: pokemonsolid;
  text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  font-size: 40px !important;
}

.nav-item {
  width: 170px;
}

.nav-item:hover {
  text-decoration: underline;
}

.navbar-brand {
  width: 8vw;
  margin-top: 36px !important;
  text-align: center;
}

.brand-logo {
  height: 90px;
}

.dropdown-item,
.dropdown-menu {
  background-color: #343a40 !important;
  color: white !important;
  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 20px !important;
  text-align: center !important;
}

.dropdown-item {
  padding-top: 13px;
}

.errorMsg {
  color: red;
  font-weight: bold;
}

.modal-footer {
  justify-content: center !important;
}

.modalBtns {
  width: 140px;
}
</style>