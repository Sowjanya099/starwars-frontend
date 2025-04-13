<template>
    <form @submit.prevent="searchCharacter">
      <input v-model="searchName" placeholder="Enter character name" />
      <button type="submit">Search</button>
    </form>
  
    <div v-if="loading">
      <p>Loading...</p>
    </div>
  
    <div v-else-if="error">
      <p>Error: {{ error.message }}</p>
    </div>
  
    <div v-else-if="character">
      <h3>{{ character.name }}</h3>
      <p>Height: {{ character.height }}</p>
      <p>Mass: {{ character.mass }}</p>
      <p>Hair Color: {{ character.hair_colors }}</p>
      <p>Skin Color: {{ character.skin_colors }}</p>
      <p>Eye Color: {{ character.eye_colors }}</p>
      <p>Birth Year: {{ character.birth_year }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Homeworld: {{ character.homeworld?.name }}</p>
      <p>Species: {{ character.species?.name }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import { GET_CHARACTER_BY_NAME } from '../graphql/characters';
  
  const searchName = ref('');
  const triggerSearch = ref(false);
  
  const { result, loading, error } = useQuery(
    GET_CHARACTER_BY_NAME,
    () => ({ name: searchName.value }),
    { enabled: triggerSearch }
  );
  
  const character = ref(null);
  
  watch(result, () => {
    character.value = result.value?.characters[0] || null;
  });
  
  const searchCharacter = () => {
    if (searchName.value.trim()) {
      triggerSearch.value = true;
    } else {
      alert('Please enter a character name.');
    }
  };
  </script>