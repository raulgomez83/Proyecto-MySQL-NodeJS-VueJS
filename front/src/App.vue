<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script></script>

<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+Tammudu+2&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  margin: 0 auto;
  --silk: #dcd0c0;
  --light: #f4f4f4;
  --dark: #373737;
  --bronze: #8f7e07;
  --gold: #eac102;
  --blue: #2874a6;
  align-items: center;
  color: var(--dark);
  background-color: var(--light);
}

#app {
  font-family: sans-serif, Helvetica, Arial;
  text-align: center;
  margin: 0 7rem;
}
body {
  margin: auto;
}
.menu {
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 162, 255, 0.6);
  width: 100%;
}
.modal label {
  color: var(--light);
}
.modalBox {
  margin: 10% auto;
  padding: 20px;
  border: 5px solid var(--gold);
  width: 20%;
}
.cerrar {
  position: fixed;
  top: 0;
  right: 00;
  height: 1rem;
  width: 1rem;
  background-color: rgba(37, 37, 37, 0);
  color: red;
  font-size: 2rem;
  font-weight: bold;
}
input {
  height: 3rem;
  width: 20rem;
  margin: 1rem;
  font-size: 2rem;
  color: var(--blue);
  border: 1px solid var(--blue);
}
button {
  color: var(--gold);
  background-color: var(--blue);
  height: 2.5rem;
  font-size: 1.5rem;
  border-radius: 5em;
  width: 20rem;
  font-weight: bold;
  border: 1px solid var(--gold);
  border-radius: 5px;
  box-shadow: 0px 5px 0px var(--gold);
  position: relative;
  top: 0px;
  transition: all ease 0.3s;
  margin: 2rem auto;
}
button:active {
  box-shadow: 0 3px 0 var(--gold);
  top: 3px;
}
</style>
