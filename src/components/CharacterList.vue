<template>
  <div>
    <h2>All Characters</h2>
    
    <!-- Loading state -->
    <div v-if="loading">
      <p>Loading characters...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error">
      <p class="text-danger">Error: {{ error.message }}</p>
    </div>

    <!-- Characters table -->
    <table v-else class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Mass (kg)</th>
          <th>Birth Year</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="char in characters" :key="char.name">
          <td>{{ char.name }}</td>
          <td>{{ char.gender }}</td>
          <td>{{ char.mass }}</td>
          <td>{{ char.birth_year }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'; 
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_CHARACTERS } from '../graphql/characters.js';

// Query to fetch all characters
const { result, loading, error } = useQuery(GET_ALL_CHARACTERS);

// Compute characters from the result
const characters = computed(() => result.value?.characters || []);
</script>

<style scoped>
.text-danger {
  color: #dc3545;
}

.table {
  width: 100%;
  margin-top: 1rem;
}

th, td {
  text-align: left;
  padding: 8px;
}

thead {
  background-color: #f8f9fa;
}

table-bordered {
  border: 1px solid #ddd;
}
</style>