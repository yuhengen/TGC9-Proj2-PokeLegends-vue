<template>
    <div id='pokedex-display' class='d-flex align-items-center'>
    <Pokedex class="pokedex-window"/>
    </div>
</template>

<script>
import Pokedex from '../Pokedex'
export default {
    components: {
        Pokedex
    }
}
</script>

<style scoped>
#pokedex-display {
  background-image: url("https://i.ytimg.com/vi/jpWxbo-vbT0/maxresdefault.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  text-align: center;
  position: relative;
}

.pokedex-window {
    height: 90%;
    overflow-y: scroll;
    font-size: 0.8rem;
}
</style>