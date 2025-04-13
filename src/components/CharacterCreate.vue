<template>
    <form @submit.prevent="createCharacter">
      <input v-model="name" placeholder="Name" />
      <input v-model="mass" type="number" placeholder="Mass" />
      <input v-model="gender" placeholder="Gender" />
      <input v-model="birth_year" placeholder="Birth Year" />
      <button type="submit">Create</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag';
  import { useQuery } from '@vue/apollo-composable';
  
  // Define the mutation inside the setup block
  const CREATE_CHARACTER = gql`
    mutation CreateCharacter($input: [CharactersCreateInput!]!) {
      createCharacters(input: $input) {
        characters {
          name
        }
      }
    }
  `;
  
  // Define the query for fetching characters
  const GET_CHARACTERS = gql`
    query GetCharacters {
      characters {
        name
        mass
        gender
        birth_year
      }
    }
  `;
  
  const name = ref('');
  const mass = ref('');
  const gender = ref('');
  const birth_year = ref('');
  
  // Use the mutation hook
  const { mutate } = useMutation(CREATE_CHARACTER);
  
  // Fetch characters using the query hook
  const { result, refetch } = useQuery(GET_CHARACTERS);
  
  // Function to reset the form fields
  const resetForm = () => {
    name.value = '';
    mass.value = '';
    gender.value = '';
    birth_year.value = '';
  };
  
  // Function to handle character creation and re-fetching characters
  const createCharacter = async () => {
    try {
      const response = await mutate({
        input: [
          {
            name: name.value,
            mass: parseInt(mass.value),
            gender: gender.value,
            birth_year: birth_year.value
          }
        ]
      });
      alert('Character created!');
  
      // Refetch characters to update the list
      await refetch();
  
      console.log(response);
  
      // Reset the form after successful creation
      resetForm();
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character. Please check the console for details.');
    }
  };
  </script>