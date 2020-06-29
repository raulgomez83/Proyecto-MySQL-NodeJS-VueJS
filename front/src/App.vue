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
  --light: #f4f4f4;
  --dark: #373737;
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

h1 {
  font-size: 4rem;
  text-shadow: 10px 10px 10px var(--blue);
  color: var(--dark);
  font-size: 20rem;
  line-height: 8rem;
}
h2 {
  font-size: 3rem;
  color: var(--blue);
}
h3 {
  color: var(--dark);
  font-size: 2.5rem;
  font-weight: bolder;
  padding-bottom: 1rem;
}
h4 {
  font-size: 2rem;
  color: var(--gold);
  -webkit-text-stroke: 0.5px var(--dark);
}
p {
  font-size: 1.5rem;
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
.box {
  border: 4px solid var(--blue);
  box-shadow: 10px 7px 10px var(--dark);
}
input {
  margin: 1rem;
  font-size: 1.5rem;
  background: var(--light);
  border: 3px solid var(--blue);
  color: var(--blue);
}
textarea {
  background-color: var(--light);
  font-size: 1.5rem;
  color: var(--blue);
}
fieldset {
  border: none;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  background-color: var(--blue);
  color: var(--gold);
  height: 2.5rem;
  padding: 0 0.5rem;
  margin: 1rem;
  font-size: 1.5rem;
  border-radius: 5em;
  font-weight: bold;
  border: 1px solid var(--gold);
  border-radius: 5px;
  box-shadow: 0px 5px 0px var(--gold);
  position: relative;
  top: 0px;
  transition: all ease 0.2s;
}
button:hover {
  background-color: var(--gold);
  color: var(--blue);
  transition-duration: 1000;
}
button:active {
  box-shadow: 2px 5px 2px var(--blue);
  top: 3px;
}
</style>
