<template id="app">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&display=swap"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <title>MOVIES</title>
  </head>
  <div>
    <ToolBar/>
    <router-view name="body"/>
  </div>
</template>

<script>


import ToolBar from "@/components/ToolBar";
export default {
  name: 'App',
  components: {ToolBar},
}
</script>

<style>
body {
  margin: 0 !important;
  /*height: 100vh;*/
}

#app {
  position: relative;
}
</style>
