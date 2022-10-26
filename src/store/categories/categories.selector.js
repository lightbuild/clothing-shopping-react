import {createSelector} from 'reselect'

const selectCategoryReducer = (state) => {
    console.log('selector 1 fired')
    return state.categories
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
      console.log('selector 2 fired')
      return categoriesSlice.categoriesArray
  }
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesArray) => {
    console.log('selector 3 fired')
    return  categoriesArray.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})}
)