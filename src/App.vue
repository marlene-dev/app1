<template>
  <div class="login_container">
    <form v-if="!loggedIn" @submit.prevent="login" class="login_form">
      <h2 class="login_form_title">Login</h2>
      <div class="login_form_field">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="login_form_field">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login_form_button">Login</button>
    </form>

    <div v-if="loggedIn" class="success_message"> 
      <p class="success_message_text">
        Login successful! Welcome, {{ email }}.
      </p>
    </div>
    <button v-if="loggedIn" v-on:click='logout' class="login_form_button">Logout</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      loggedIn: false,
    };
  },
  methods: {
    logout(){
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
      if (result.status == 200 && result.data.length > 0) {
        this.loggedIn = true;
        localStorage.setItem("user.info", JSON.stringify(result.data[0]));
        window.dispatchEvent(
          new CustomEvent("user-data-changed", {
            detail: {
              storage: JSON.stringify(result.data[0]),
            },
          })
        );
        // Perform necessary actions after successful login, such as redirecting to another page
      } else {
        this.showSuccessMessage = false;
        // Handle login failure, such as displaying an error message
      }

      // Reset the form fields
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
  width: 300px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.login_form_title {
  text-align: center;
  margin-bottom: 20px;
  color: magenta;
}

.login_form_field {
  margin-bottom: 15px;
}

.login_form_field label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.login_form_field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login_form_button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: magenta;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.success_message {
  margin-top: 20px;
  text-align: center;
}

.success_message_text {
  color: magenta;
}
</style>
