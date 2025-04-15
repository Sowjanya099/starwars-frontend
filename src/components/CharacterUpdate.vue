<template>
  <b-card class="mb-4">
    <h3 class="text-center mb-4">Update Character</h3>
    <b-form @submit.prevent="updateCharacter">
      <b-row>
        <b-col md="6">
          <b-form-group label="Character Name" label-for="name">
            <b-form-input
              id="name"
              v-model="name"
              placeholder="Enter character's name to update"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="New Mass" label-for="mass">
            <b-form-input
              id="mass"
              v-model="mass"
              type="number"
              placeholder="Enter new mass"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <b-form-group label="New Gender" label-for="gender">
            <b-form-input
              id="gender"
              v-model="gender"
              placeholder="Enter new gender"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group label="New Birth Year" label-for="birth_year">
            <b-form-input
              id="birth_year"
              v-model="birth_year"
              placeholder="Enter new birth year"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="d-flex justify-content-center">
        <b-col class="text-center">
          <b-button
            type="submit"
            variant="primary"
            :disabled="loading"
            class="btn-sm"
          >
            {{ loading ? 'Updating...' : 'Update Character' }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
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
      alert('Character not found. Please check the name and try again.');
      resetForm();
    }
  } catch (error) {
    console.error('Error updating character:', error);
    alert('Failed to update character. Check console for details.');
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