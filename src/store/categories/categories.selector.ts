import {createSelector} from 'reselect'

import {CategoriesState} from './categories.reducer';
import {CategoryMap} from './categories.types';

const selectCategoryReducer = (state):CategoriesState => {
    return state.categories
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
      return categoriesSlice.categoriesArray
  }
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesArray) => {
    return  categoriesArray.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)}
)

export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)