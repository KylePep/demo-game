<script setup>
import PhaserGame from './game/PhaserGame.vue';

</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
</template>