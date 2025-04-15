<template>
  <b-card class="mb-4">
    <h3 class="text-center mb-4">Search Character</h3>
    <b-form @submit.prevent="searchCharacter">
      <b-form-group label="Character Name" label-for="searchName">
        <b-form-input
          id="searchName"
          v-model="searchName"
          placeholder="Enter character name"
          required
        ></b-form-input>
      </b-form-group>

      <b-row class="d-flex justify-content-center">
        <b-col class="text-center" cols="auto">
          <b-button type="submit" variant="primary" :disabled="loading">
            {{ loading ? 'Searching...' : 'Search Character' }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>

    <div v-if="loading" class="mt-3">
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="mt-3 text-danger">
      <p>Error: {{ error.message }}</p>
    </div>

    <b-card
      v-else-if="character"
      class="mt-4 mx-auto"
      style="max-width: 600px;"
      header-tag="header"
      footer-tag="footer"
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
    >
      <template #header>
        <h4 class="mb-0 text-center">{{ character.name }}</h4>
      </template>

      <b-list-group flush>
        <b-list-group-item><strong>Height:</strong> {{ character.height }}</b-list-group-item>
        <b-list-group-item><strong>Mass:</strong> {{ character.mass }}</b-list-group-item>
        <b-list-group-item><strong>Hair Color:</strong> {{ character.hair_colors }}</b-list-group-item>
        <b-list-group-item><strong>Skin Color:</strong> {{ character.skin_colors }}</b-list-group-item>
        <b-list-group-item><strong>Eye Color:</strong> {{ character.eye_colors }}</b-list-group-item>
        <b-list-group-item><strong>Birth Year:</strong> {{ character.birth_year }}</b-list-group-item>
        <b-list-group-item><strong>Gender:</strong> {{ character.gender }}</b-list-group-item>
        <b-list-group-item><strong>Homeworld:</strong> {{ character.homeworld?.name }}</b-list-group-item>
        <b-list-group-item><strong>Species:</strong> {{ character.species?.name }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card>
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
  if (result.value?.characters?.length) {
    character.value = result.value.characters[0];
  } else {
    character.value = null;
  }
});

const searchCharacter = () => {
  if (searchName.value.trim()) {
    triggerSearch.value = true;
  } else {
    alert('Please enter a character name.');
  }
};
</script>

<style scoped>
.b-card {
  max-width: 600px;
  margin: 0 auto;
}

.mt-3 {
  margin-top: 1rem;
}

.text-danger {
  color: #dc3545;
}

#b-list-group {
  align-items: center;
}
</style>