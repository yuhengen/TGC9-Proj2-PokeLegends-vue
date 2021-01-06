<template>
    <div id='pokedex-display' class='d-flex align-items-center'>
    <Pokedex class="pokedex-window"/>
    <img src="https://image.flaticon.com/icons/png/512/458/458594.png" @click="closePokedex" class="cancelBtn"/>
    </div>
</template>

<script>
import Pokedex from '../Pokedex'
export default {
    components: {
        Pokedex
    },
    methods: {
        closePokedex: function() {
            this.$store.state.gameState = 'game_menu'
            console.log(this.$store.state.gameState)
        }
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
    width:100%;
    overflow-y: scroll;
    font-size: 0.8rem;
}

.cancelBtn {
    position:absolute;
    top: 1%;
    right: 1%;
    height:10%;
}

.cancelBtn:hover {
    cursor:pointer;
}
</style>