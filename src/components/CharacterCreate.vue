<template>
  <b-card class="mb-4">
    <h3 class="text-center mb-4">Create a New Character</h3>
    <b-form @submit.prevent="createCharacter">
      <b-row>
        <b-col md="6">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="name"
              placeholder="Enter character's name"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Mass" label-for="mass">
            <b-form-input
              id="mass"
              v-model="mass"
              type="number"
              placeholder="Enter character's mass"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="Gender" label-for="gender">
            <b-form-input
              id="gender"
              v-model="gender"
              placeholder="Enter character's gender"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="Birth Year" label-for="birth_year">
            <b-form-input
              id="birth_year"
              v-model="birth_year"
              placeholder="Enter character's birth year"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      
      <b-row class="d-flex justify-content-center">
        <b-col class="text-center">
          <b-button type="submit" variant="success" class="btn-sm">
            Create Character
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';


const CREATE_CHARACTER = gql`
  mutation CreateCharacter($input: [CharactersCreateInput!]!) {
    createCharacters(input: $input) {
      characters {
        name
      }
    }
  }
`;


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


const { mutate } = useMutation(CREATE_CHARACTER);
const { result, refetch } = useQuery(GET_CHARACTERS);


const resetForm = () => {
  name.value = '';
  mass.value = '';
  gender.value = '';
  birth_year.value = '';
};


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
    await refetch();
    resetForm();
  } catch (error) {
    console.error('Error creating character:', error);
    alert('Failed to create character. Please check the console for details.');
  }
};
</script>

<style scoped>
.b-card {
  max-width: 600px;
  margin: 0 auto;
}

.b-row {
  margin-bottom: 1rem;
}

.b-col {
  padding-right: 1rem;
  padding-left: 1rem;
}
</style>