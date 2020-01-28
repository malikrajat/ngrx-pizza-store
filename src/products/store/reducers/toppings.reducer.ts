import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

// state
export interface ToppingsState {
  entities: {
    [id: number]: Topping
  };
  loaded: boolean;
  loading: boolean;
}

// initial state
export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS:
      return {
        ...state,
        loading: true
      };
    case fromToppings.LOAD_TOPPINGS_SUCCESS:
      const entities = action.payload.reduce(
        (toppings: { [id: number]: Topping }, topping: Topping) => ({ ...toppings, [topping.id]: topping }),
        { ...state.entities }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    case fromToppings.LOAD_TOPPINGS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
  }

  return state;
}

// getters
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingLoading = (state: ToppingsState) => state.loading;
export const getToppingLoaded = (state: ToppingsState) => state.loaded;
