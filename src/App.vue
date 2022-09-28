<template>
    <v-app light>
        <v-main>
            <router-view :key="this.$route.path"/>
        </v-main>
    </v-app>
</template>

<script>
import Main from './components/Main';

export default {
    name: 'App',

    components: {
        Main
    },

    data: () => ({
        //
    }),
};
</script>

<style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
</style>

<style>
html {
    overflow: hidden !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
#app {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 1.5vh;
}
* {
  margin: 0;
  padding: 0;
}
body {
    display: block;
    margin: 0px;
    font-size: 1.5vh;
}
</style>
