import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
  console.log('selector 1 fired');
  return state.categories;

}

//Memorized selector
//The only time where this will run is if this category slice object that we get back from this selector is different.
export const selectCategories = createSelector(
  [selectCategoryReducer], //input selectors
  (categoriesSlice) => {
    console.log('selector 2 fired');
    return categoriesSlice.categories //output selector
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories], //input selector
  (categories) => {
    console.log('selector 3 fired');
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

//you transform the data from the reducer into the final shape that you want it to be.

//The selector is where you do transformation business logic.
//we migrated over our selector code from our reducer so that we able to convert our categories
//array that we store inside of Redux into the categories map that we use in order to access our categories.
