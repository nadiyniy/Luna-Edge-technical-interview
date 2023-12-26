# Luna Edge technical interview

**Website:**

Vercel: <https://luna-edge-technical-interview.vercel.app/>

## Basic commands

- Run app: <code>yarn vite</code>
- Install deps: <code>yarn install</code>
- Build app: <code>yarn build</code>
- Run storybook: <code>yarn storybook</code>


## Project Overview

This project implements a React-based form that includes validation, Storybook integration for the Button component, and a modal for displaying a Pokémon team. The main components are 'Select', 'Form' and 'Button'.

## Additional Information

### Key Features:

Name and last name validation with error messages for required fields, length constraints, and character patterns.
Dynamic messaging based on the number of Pokémon selected and the completeness of the user's information.
Utilizes a modal (PokemonModal) to display the selected Pokémon team.

### Local Storage

The selected Pokémon team is stored in local storage to persist data across sessions. The retrieval and initialization of selected Pokémon from local storage are handled in the useEffect hook.

### Storybook

The Storybook setup enables developers to visualize and edit the Button component easily. It includes an example for an outlined variant.
