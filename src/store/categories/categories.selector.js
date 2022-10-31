import {createSelector} from 'reselect'

const selectCategoryReducer = (state) => {
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
  }, {})}
)