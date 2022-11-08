import {AnyAction} from 'redux';

import {Category} from './categories.types';

import {fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure} from './categories.action';

export type CategoriesState = {
  readonly categoriesArray: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categoriesArray: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true};
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {...state, categoriesArray: action.payload, isLoading: false};
  }

  if (fetchCategoriesFailure.match(action)) {
    return {...state, error: action.payload, isLoading: false};
  }
  return state;
};
