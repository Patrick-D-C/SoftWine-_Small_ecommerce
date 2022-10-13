import { IORequest } from "../config/api";
import { ItemProps } from "../models/Order";

const requestInsertOrder = (data: {
  cart: ItemProps[];
  distance: number;
  price: number;
}) => {
  return {
    url: "/orders/add",
    method: "POST",
    form: data,
    params: null,
  } as IORequest;
};
const requestOrder = (id: number) => {
  return {
    url: `/orders/search/${id}`,
    method: "GET",
    form: null,
    params: null,
  } as IORequest;
};

const requestListOrders = () => {
  return {
    url: "/orders/list",
    method: "GET",
    form: null,
    params: null,
  } as IORequest;
};

export { requestInsertOrder, requestOrder, requestListOrders };
