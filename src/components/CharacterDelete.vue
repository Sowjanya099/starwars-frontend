<template>
    <form @submit.prevent="deleteCharacter">
      <input v-model="name" placeholder="Name to delete" />
      <button type="submit">Delete</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMutation, useQuery } from '@vue/apollo-composable';
  import { DELETE_CHARACTER, GET_ALL_CHARACTERS } from '../graphql/characters';
  
  const name = ref('');
  
  // Mutation for deleting character
  const { mutate } = useMutation(DELETE_CHARACTER);
  
  // Query to fetch characters and enable refetching
  const { refetch } = useQuery(GET_ALL_CHARACTERS);
  
  // Delete character method
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
        await refetch(); // Refresh the character list
        name.value = ''; // Clear the input field after successful deletion
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