# Recipe Finder

## Overview

Recipe Finder is an Angular-based application that allows users to search for recipes, view recipe details, and manage their favorite recipes. It integrates with TheMealDB API to fetch recipe data and provides a seamless user experience with state management using NgRx.

- User-friendly interface for searching and viewing recipes.
- Ability to save favorite recipes.
- Responsive design for mobile and desktop users.

## Setup and Installation

### Prerequisites

- Node.js: Ensure you have Node.js installed (version 14 or higher).
- Angular CLI: Install Angular CLI globally using:

```
  npm install -g @angular/cli
```

To get started with the Recipe Finder project, follow these steps:

1. **Clone the repository:**

   ```
   git clone https://github.com/sbarranco/recipe-finder.git
   ```

2. **Navigate to the project directory:**

   ```
   cd recipe-finder
   ```

3. **Install dependencies:**

   ```
   npm install
   ```

4. **Run the application:**

   ```
   npm run start
   ```

5. **Open your browser and navigate to:**

   ```
   http://localhost:4200
   ```

6. **Run tests:**

   ```
   npm run test
   ```

7. **Build Application:**
   ```
   npm run build
   ```

## Tools and Libraries Used

### Frontend Framework

- **Angular:** A TypeScript-based framework for building web applications.

### State Management

- **NgRx:** Used for managing application state with actions, reducers, selectors, and effects.
- **Facade Pattern:** The facade pattern is used to connect the view with the store, making the code more modular, easier to maintain, and more testable.

### Testing

- **Jest:** A JavaScript testing framework for unit tests.

### Styling

- **SCSS:**: Used for styling components with modular and reusable styles.
- **BEM Methodology**: A CSS methodology used to create reusable and maintainable styles.

## Components

### Key Components

1. **SearchBarComponent:** Allows users to search for recipes by keyword.
   Includes a clear button and a random recipe button.
   Styled using BEM methodology (.search-bar, .search-bar**input-container, .search-bar**icon).

2. **RecipeCardComponent:**
   Displays a single recipe card with details like the recipe name, category, and thumbnail.
   Includes a button to mark the recipe as a favorite.
   Styled using BEM methodology (.recipe-card, .recipe-card**title, .recipe-card**image).

3. **RecipeListPage:**
   Displays a list of recipes fetched from the API.
   Integrates the SearchBarComponent and RecipeCardComponent.

4. **RecipeDetailsPage:**
   Displays detailed information about a selected recipe, including ingredients and instructions.

## Components

## Assumptions and Design Decisions

1. **API Integration:**
   The application integrates with the TheMealDB API to fetch recipe data.
   Assumes the API provides consistent data for recipes, including ingredients and measures.

2. **State Management:**
   NgRx is used to manage the state of recipes, favorite recipes, and loading/error states.
   Selectors are used to derive computed state (e.g., combining recipes with favorite status).

3. **Styling:**
   SCSS is used for styling, following the BEM methodology to ensure modular and reusable styles.

4. **Testing:**
   Unit tests are written for services, reducers, selectors, and effects to ensure functionality.
   Mock data is used for testing to simulate API responses.

5. **Responsiveness:**
   The application is designed to be responsive, ensuring usability across devices.

6. **Error Handling:**
   Errors from API calls are captured and displayed to the user using the error state.

## Folder Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components (e.g., RecipeCard, SearchBar)
│   ├── pages/              # Feature pages (e.g., RecipeList, RecipeDetails)
│   ├── services/           # API service for fetching recipe data
│   ├── state/
│   │   ├── facade/         # Facade observables and methods from store
│   │   ├── actions/        # NgRx actions
│   │   ├── reducers/       # NgRx reducers
│   │   ├── selectors/      # NgRx selectors
│   │   ├── effects/        # NgRx effects
│   ├── styles/             # Global SCSS styles
│   ├── app.module.ts       # Root module
│   ├── app.component.ts    # Root component

```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

I'd also be happy to answer any other questions or issues related to this project. Thank you for the opportunity!! :-)
