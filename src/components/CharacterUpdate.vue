<template>
    <form @submit.prevent="updateCharacter">
      <input v-model="name" placeholder="Character Name to update" />
      <input v-model="mass" placeholder="New Mass" />
      <input v-model="gender" placeholder="New Gender" />
      <input v-model="birth_year" placeholder="New Birth Year" />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update' }}
      </button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMutation, useQuery } from '@vue/apollo-composable';
  import { UPDATE_CHARACTER, GET_ALL_CHARACTERS } from '../graphql/characters.js';
  
  const name = ref('');
  const mass = ref('');
  const gender = ref('');
  const birth_year = ref('');
  
  const { refetch } = useQuery(GET_ALL_CHARACTERS);
  const { mutate, loading } = useMutation(UPDATE_CHARACTER);
  
  const resetForm = () => {
    name.value = '';
    mass.value = '';
    gender.value = '';
    birth_year.value = '';
  };
  
  const updateCharacter = async () => {
    if (!name.value.trim()) {
      alert('Please enter a character name to update.');
      return;
    }
  
    const variables = {
      name: name.value,
      mass: mass.value ? Number(mass.value) : null,
      gender: gender.value || null,
      birth_year: birth_year.value || null,
    };
  
    try {
      const response = await mutate(variables);
      const updated = response?.data?.updateCharacter;
  
      if (updated && Object.keys(updated).length > 0) {
        alert(`Character "${updated.name}" updated!`);
        await refetch();
        resetForm(); // clear form
      } else {
        alert(' Character not found. Please check the name and try again.');
        resetForm();
      }
    } catch (error) {
      console.error('Error updating character:', error);
      alert(' Failed to update character. Check console for details.');
    }
  };
  </script>