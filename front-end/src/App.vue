<template>
  <div id="app">
    <div id="menu">

    <div id="brand">
      <router-link to="/">
        <h1> BLACKJACK </h1>
      </router-link>
    </div>
    <div id="side">

<div id="lside">
  <router-link to="/PlayBJ">
    <div class="menu-item">
        <img src="/images/add.svg">
        <p> Play! </p>
      </div>
  </router-link>
  </div>
      <router-link to="/dashboard">
        <div class="menu-item">
          <img src="/images/CardIcon.svg">
          <p>Edit Decks</p>
        </div>
      </router-link>

    </div>
  </div>
  <router-view />
    <header id="header">
      <h5>Manage Deck</h5>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/dashboard"><i class="fas fa-user-tie"></i></router-link>
      </nav>
    </header>
 
  </div>
</template>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E
 */

#header {
  /* Semi-circle */
  margin: 1em 1em 1em 0;
  height: 150px;
  width: 200px;

  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 10%;
  top: 0%;

  /* Color and alignment */
  background: black;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

h5 {
  color: #fff;
  font-size: 18px;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}

* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
  
}

h1 {
color: black;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
  margin: 10px;
}

#lside img {
  width: 42px;
  margin: 15px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}
.router-link-exact-active .router-link--active{
  color: black !important;
}
a{
  color: black !important;
}

.menu-item p {
  margin: 0px;
  color: black;
}

.browse {
  margin-right: 50px;
}

@media only screen and (max-width: 809px) {
#header {
  /* Semi-circle */
  margin: 1em .5em .5em 0;
  height: 150px;
  width: 170px;

  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 10%;
  
  

  /* Color and alignment */
  background: black;
  text-align: center;
}
}
@media only screen and (max-width: 700px) {
#header {
  /* Semi-circle */
  margin: 1em 1em 1em 0;
  height: 150px;
  width: 200px;

  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 0%;
  top: 80%;
  

  /* Color and alignment */
  background: black;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}
}
</style>

