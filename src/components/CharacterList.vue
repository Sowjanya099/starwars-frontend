<template>
    <div>
      <h2>All Characters</h2>
      <ul>
        <li v-for="char in characters" :key="char.name">
          {{ char.name }} - {{ char.gender }}, {{ char.mass }} kg, Born: {{ char.birth_year }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue'; 
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_CHARACTERS } from '../graphql/characters.js';

const { result, loading } = useQuery(GET_ALL_CHARACTERS);
const characters = computed(() => result.value?.characters || []);
</script>