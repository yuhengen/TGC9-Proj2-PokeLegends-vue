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
              ><router-link to="/register">Register</router-link></b-nav-item
            >
          </b-navbar-nav>

          <b-navbar-brand href="#" class="ml-4 mr-4">
            <img
              src="https://i.pinimg.com/originals/50/e1/db/50e1db4684e6f697f93590950eb832f6.png"
              class="brand-logo"
            />
          </b-navbar-brand>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="loginUser == ''">
            <b-nav-item href="#" class="ml-4 mr-4" disabled>Pokédex</b-nav-item>
            <b-nav-item href="#" class="ml-4" v-b-modal.modal-center
              >Login</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item href="#" class="ml-4 mr-4">Pokédex</b-nav-item>
            <b-nav-item-dropdown right class="ml-4">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ loginUser }}</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <!-- <b-dropdown-item @click="logoutAccount">Sign Out</b-dropdown-item> -->
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <!-- Login Modal -->
    <div>
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
            <span>{{ invalidUser }}</span>
          </b-form-group>
        </form>
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
      usernameState: null,
      loginUser: "",
      invalidUser: "",
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
      this.invalidUser = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit: async function () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      let response = await axios.get(
        "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata"
      );
      let users = response.data;

      for (let u of users) {
        if (this.username.toLowerCase() == u.username.toLowerCase()) {
          this.loginUser = u.username;
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide("modal-center");
          });
        } else {
          this.invalidUser = "Username does not exist";
        }
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  height: 70px;
}

.navbar a,
.navbar em {
  color: white !important;
  font-family: pokemonsolid;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 30px !important;
  text-align: center;
  padding-bottom: 20px !important;
}

.navbar-brand {
  font-family: pokemonsolid;
  text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
  font-size: 40px !important;
}

.nav-item {
  width: 150px;
}

.nav-item:hover {
    text-decoration: underline;
}

.navbar-brand {
  width: 8vw;
  margin-top: 36px !important;
}

.brand-logo {
  height: 90px;
}

.dropdown-item,
.dropdown-menu {
  background-color: #343a40;
  color: white;
}
</style>