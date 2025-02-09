<script setup>
import Phaser from 'phaser';
import { onMounted, ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

// onMounted(() => {
//     setBgImg();
// });

// The sprite can only be moved in the MainMenu Scene
// const canMoveSprite = ref();

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();

// const setBgImg = () => {
//     const mainElement = document.querySelector('main');
//     if (mainElement) {
//         let bgImg = 'https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
//         mainElement.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${bgImg})`;
//     }
// }

//  This event is emitted from the PhaserGame component:
// const currentScene = (scene) => {

//     canMoveSprite.value = (scene.scene.key !== 'MainMenu');

// }
</script>

<template>
    <main>
        <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    </main>
</template>

<style>
main {
    background-image: url('https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
</style>