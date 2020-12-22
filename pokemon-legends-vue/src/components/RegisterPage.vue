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
// import axios from "axios";

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
};
</script>

<style scoped>
.errorMsg {
  color: red;
  font-weight: bold;
}
</style>