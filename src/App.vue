
<template>
  <div class="login_container">
    <form v-if="!loggedIn" @submit.prevent="login" class="login_form">
      <div class="login_form_field">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="login_form_field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login_form_button">Login</button>
      <p v-if="loginError" class="error_message">Incorrect email or password.</p>
    </form>

    <div v-if="loggedIn" class="success_message"> 
      <p class="success_message_text">
        Login successful! Welcome, {{ loggedInEmail }}.
      </p>
      <button v-on:click="logout" id="logout" class="login_form_button">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      loggedInEmail: "",
      loggedIn: false,
      loginError: false, 
    };
  },
  methods: {
    logout() {
      this.loggedIn = false;
      window.dispatchEvent(
        new CustomEvent("user-data-changed", {
          detail: {
            storage: "{}"
          },
        })
      );
    },
    async login() {
      let result = await axios.get(
        `http://localhost:3001/users?email=${this.email}&password=${this.password}`
      );
      if (result.status === 200 && result.data.length > 0) {
        this.loggedInEmail = this.email;
        this.loggedIn = true;
        this.loginError = false; 
        localStorage.setItem("user.info", JSON.stringify(result.data[0]));
        window.dispatchEvent(
          new CustomEvent("user-data-changed", {
            detail: {
              storage: JSON.stringify(result.data[0]),
            },
          })
        );
      } else {
        this.loginError = true; 
      }

      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login_form {
  width: 400px;
  padding: 30px;
  background-color: #eeeeee;
  border-radius: 5px;
}

.login_form_field {
  margin-bottom: 28px;
}

.login_form_field label {
  display: block;
}

.login_form_field input {
  width: 95%;
  padding: 10px;
  border-radius: 5px;
}

.login_form_button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  font-size: 150%;
  background-color: magenta;
  border-radius: 5px;
  cursor: pointer;
}

.success_message {
  text-align: center;
}

.success_message_text {
  color: magenta;
}
</style>
