import { WineProps } from "./Wine";

type ItemProps = {
  product: WineProps;
  quantity: number;
};

type OrderProps = {
  id: number;
  price: number;
  distance: number;
  created_at: string;
  itens: {
    id_wine: number;
    name: string;
    price: number;
    quantity: number;
    type: string;
    weight: number;
  }[];
};

export interface ReducerCartAction {
  type: string;
  payload?: any;
}

export function reducerCart(state: ItemProps[], action: ReducerCartAction) {
  switch (action.type) {
    case "add":
      if (action.payload.product) {
        if (
          !state.some((item) => item.product.id == action.payload.product.id)
        ) {
          return [...state, action.payload];
        }
      } else {
        state.map((item) => {
          if (item.product.id === action.payload.product.id) {
            item.quantity = action.payload.quantity;
          }
        });
      }

    case "update":
      state.map((item, index) => {
        if (item.product.id === action.payload.id) {
          if (action.payload.quantity > 0) {
            item.quantity = action.payload.quantity;
          } else {
            delete state[index];
          }
        }
      });
      return state;

    case "remove":
      return state.filter((item) => item.product.id !== action.payload.id);

    case "clear":
      return [];

    default:
      return state;
  }
}

export type { ItemProps, OrderProps };
