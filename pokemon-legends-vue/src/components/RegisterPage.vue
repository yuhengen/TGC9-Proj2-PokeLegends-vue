<template>
  <div>
    <h1 class="mt-4">Register Account</h1>
    <div>
      <b-form>
        <!-- email address -->
        <b-form-group
          id="emailField"
          label="Email address:"
          label-for="input-1"
          class="mt-4"
        >
          <b-form-input
            id="emailField"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
          <span class="errorMsg">{{ emailErrorMsg }}</span>
        </b-form-group>

        <!-- username -->
        <b-form-group
          id="input-group-2"
          label="Userame:"
          label-for="usernameField"
          class="mt-4"
        >
          <b-form-input
            id="usernameField"
            v-model="form.username"
            placeholder="Enter username"
            required
          ></b-form-input>
          <span class="errorMsg">{{ userErrorMsg }}</span>
        </b-form-group>

        <!-- password -->
        <b-form-group
          id="input-group-3"
          label="Password:"
          label-for="passwordField"
          class="mt-4"
        >
          <b-form-input
            type="password"
            id="passwordField"
            v-model="form.password"
            placeholder="Enter password"
            required
          ></b-form-input>
          <span class="errorMsg">{{ pwErrorMsg }}</span>
        </b-form-group>

        <!-- confirm password -->
        <b-form-group
          id="input-group-4"
          label="Re-enter Password:"
          label-for="confirmPWField"
          class="mt-4"
        >
          <b-form-input
            type="password"
            id="confirmPWField"
            v-model="cfmPassword"
            placeholder="Re-enter password"
            required
          ></b-form-input>
          <span class="errorMsg">{{ pwErrorMsg2 }}</span>
        </b-form-group>

        <!-- gender -->
        <b-form-group label="Gender" v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="form.gender"
            :aria-describedby="ariaDescribedby"
            name="gender"
            value="Male"
            >Male</b-form-radio
          >
          <b-form-radio
            v-model="form.gender"
            :aria-describedby="ariaDescribedby"
            name="gender"
            value="Female"
            >Female</b-form-radio
          >
          <span class="errorMsg">{{ genderErrorMsg }}</span>
        </b-form-group>

        <b-button variant="primary" @click="registerAccount" class="mt-3"
          >Submit</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userdata: [],
      form: {
        email: "",
        username: "",
        password: "",
        gender: "",
      },
      cfmPassword: "",
      userErrorMsg: "",
      userError: false,
      emailErrorMsg: "",
      emailError: false,
      pwErrorMsg: "",
      pwErrorMsg2: "",
      pwError: false,
      genderErrorMsg: "",
      genderError: false,
    };
  },

  methods: {
    registerAccount: async function () {
      let response = await axios.get(
        "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata"
      );
      let users = response.data;

      this.userError = false;
      this.userErrorMsg = "";
      this.emailError = false;
      this.emailErrorMsg = "";
      this.pwError = false;
      this.pwErrorMsg = "";
      this.genderError = false;
      this.genderErrorMsg = "";

      for (let u of users) {
        if (this.form.username === "") {
          this.userErrorMsg = "* Username is required";
          this.userError = true;
        } else if (
          this.form.username.toLowerCase() == u.username.toLowerCase()
        ) {
          this.userErrorMsg = "* Username already exists";
          this.userError = true;
        }
      }

      for (let u of users) {
        if (this.form.email === "") {
          this.emailErrorMsg = "* Email address is required";
          this.emailError = true;
        } else if (this.form.email.toLowerCase() == u.email.toLowerCase()) {
          this.emailErrorMsg = "* Email already exists";
          this.emailError = true;
        }
      }

      if (this.form.password === "") {
        this.pwErrorMsg = "* Password cannot be empty";
        this.pwError = true;
      } else if (this.form.password !== this.cfmPassword) {
        this.pwErrorMsg2 = "* Password mismatch";
        this.pwError = true;
      }

      if (
        this.form.gender.toLowerCase() !== "male" &&
        this.form.gender.toLowerCase() !== "female"
      ) {
        this.genderErrorMsg = "* Please select your gender";
        this.genderError = true;
      }

      if (
        !this.userError &&
        !this.emailError &&
        !this.pwError &&
        !this.genderErrorMsg
      ) {
        await axios.post(
          "https://3000-f3eac718-8094-4909-ae3d-71ff4f3b9110.ws-us03.gitpod.io/userdata",
          {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            gender: this.form.gender,
            game_currency: 0,
            party_pokemon: [],
            store_pokemon: [],
            pokedex: [],
            badges: [],
            bag: [],
          }
        );
        this.form.username = "";
        this.form.email = "";
        this.form.password = "";
        this.cfmPassword = "";
        this.form.gender = false;
        alert("New account has been registered!");
      }
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
  font-weight: bold;
}
</style>