<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <div class="center-navbar">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="margin-right">
            <b-nav-item class="margin-right" @click="stopBGM"
              ><router-link to="/">Home</router-link></b-nav-item
            >
            <b-nav-item class="margin-left margin-right" @click="stopBGM"
              ><router-link to="/pokedex">Pokédex</router-link></b-nav-item
            >
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav
            class="margin-left"
            v-if="$store.state.loginState == false"
          >
            <b-nav-item class="margin-left" v-b-modal.loginModal
              >Login</b-nav-item
            >
            <b-nav-item class="margin-left margin-right"
              ><router-link to="/game">Play</router-link></b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="margin-left" v-else>
            <b-nav-item-dropdown right class="margin-left">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Profile</em>
              </template>
              <span>{{ $store.state.username }}</span>
              <div class="dropdown-divider"></div>
              <!-- <b-dropdown-item href="#">Settings</b-dropdown-item> -->
              <b-dropdown-item
                @click="
                  logoutAccount();
                  stopBGM();
                "
                >Log Out</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <b-nav-item class="margin-left margin-right"
              ><router-link to="/game">Play</router-link></b-nav-item
            >
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

    <div id="brand-logo">
      <router-link to="/game">
        <div class="brand-logo"></div>
        <!-- <img
          src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
          class="brand-logo"
          style="position: relative; left: -50%"
        /> -->
      </router-link>
    </div>
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
        "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata"
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
              "https://pxs-tgc9-pokemonlegendsapi.herokuapp.com/userdata/" +
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
    stopBGM() {
      if (this.$store.state.bgm !== null) {
        this.$store.state.bgm.pause();
        this.$store.state.bgmName = "";
      }
    },
  },
};
</script>

<style>
.navbar {
  z-index: 10;
}

.navbar-toggler-icon {
  background-image: url("https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png") !important;
}

.navbar a,
.navbar em {
  color: white !important;
  font-family: pokemonsolid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 30px;
  padding-bottom: 20px !important;
  text-align: center;
}

.nav-item {
  width: 170px;
}

.nav-item:hover {
  text-decoration: underline;
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

@media only screen and (min-width: 991px) {
  .center-navbar {
    margin: auto;
  }

  .margin-right {
    margin-right: 35px;
  }

  .margin-left {
    margin-left: 35px;
  }

  #brand-logo {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 11;
  }

  .brand-logo {
    position: relative;
    left: -50%;
    height: 90px;
    width: 90px;
    background-image: url("https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>