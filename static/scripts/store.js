import { writable, derived } from 'svelte/store';

export const apiData = writable([]);

export const drinkNames = derived(apiData, ($apiData) => {
  if ($apiData.name){
    return $apiData.drinks.map(name => name.strDrink);
  }
  return [];
});