import { gql } from '@apollo/client/core';

export const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      name
      mass
      gender
      birth_year
    }
  }
`;

export const GET_CHARACTER_BY_NAME = gql`
query ($name: String!) {
    characters(where: { name: { eq: $name } }) {
      name
      height
      mass
      hair_colors
      skin_colors
      eye_colors
      birth_year
      gender
      homeworld {
        name
      }
      species {
        name
      }
    }
  }
`;

export const CREATE_CHARACTER = gql`
  mutation ($input: [CharacterCreateInput!]!) {
    createCharacters(input: $input) {
      characters {
        name
      }
    }
  }
`;

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($name: String!, $mass: Int, $gender: String, $birth_year: String) {
    updateCharacter(name: $name, mass: $mass, gender: $gender, birth_year: $birth_year) {
      name
      mass
      gender
      birth_year
    }
  }
`;

export const DELETE_CHARACTER = gql`
  mutation ($name: String!) {
    deleteCharacters(where: { name: { eq: $name } }) {
      nodesDeleted
    }
  }
`;