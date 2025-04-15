<template>
  <div class="container p-4">
    <h1 class="mb-4 text-center text-primary">Star Wars Character Manager</h1>
    <CharacterCreate />
    <CharacterUpdate />
    <CharacterDelete />
    <CharacterDetail />
    <CharacterList />
  </div>
</template>

<script setup>
import CharacterList from './components/CharacterList.vue';
import CharacterCreate from './components/CharacterCreate.vue';
import CharacterUpdate from './components/CharacterUpdate.vue';
import CharacterDelete from './components/CharacterDelete.vue';
import CharacterDetail from './components/CharacterDetail.vue';
</script>

<style scoped>
h1 {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
}
</style>