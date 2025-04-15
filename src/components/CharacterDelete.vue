<template>
  <b-card class="mb-4">
    <h3 class="text-center mb-4">Delete a Character</h3>
    <b-form @submit.prevent="deleteCharacter">
      <b-form-group label="Character Name" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          placeholder="Enter character name to delete"
          required
        ></b-form-input>
      </b-form-group>

      <b-row class="d-flex justify-content-center">
        <b-col class="text-center">
          <b-button type="submit" variant="success" class="btn-sm">
            Delete Character
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { DELETE_CHARACTER, GET_ALL_CHARACTERS } from '../graphql/characters';

const name = ref('');


const { mutate } = useMutation(DELETE_CHARACTER);


const { refetch } = useQuery(GET_ALL_CHARACTERS);


const deleteCharacter = async () => {
  if (!name.value.trim()) {
    alert('Please enter a character name to delete.');
    return;
  }

  try {
    const response = await mutate({ name: name.value });
    const deleted = response?.data?.deleteCharacters;

    if (deleted && deleted.nodesDeleted > 0) {
      alert(`Character "${name.value}" deleted!`);
      await refetch(); 
      name.value = ''; 
    } else {
      alert('Character not found or already deleted. Please check the name and try again.');
    }
  } catch (error) {
    console.error('Error deleting character:', error);
    if (error.networkError) {
      console.error('Network Error:', error.networkError);
    }
    if (error.graphQLErrors) {
      console.error('GraphQL Errors:', error.graphQLErrors);
    }
    alert('Failed to delete character. Please check the console for details.');
  }
};
</script>

<style scoped>
.b-card {
  max-width: 500px;
  margin: 0 auto;
}
</style>