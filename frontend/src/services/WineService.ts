import { IORequest } from "../config/api";

const requestListWines = () => {
  return {
    url: "/wine/list",
    method: "GET",
    form: null,
    params: null,
  } as IORequest;
};

const requestWine = (id: string) => {
  return {
    url: "/wine/search/" + id,
    method: "GET",
    form: null,
    params: null,
  } as IORequest;
};

const requestAddWine = (data: {
  name: string;
  price: number;
  type: string;
  weight: number;
}) => {
  return {
    url: "/wine/add",
    method: "POST",
    form: data,
    params: null,
  } as IORequest;
};

const requestUpdateWine = (
  data: {
    name: string;
    price: number;
    type: string;
    weight: number;
  },
  id: string
) => {
  return {
    url: "/wine/update/" + id,
    method: "POST",
    form: data,
    params: null,
  } as IORequest;
};

const requestRemoveWine = (id: string) => {
  return {
    url: "/wine/delete/" + id,
    method: "DELETE",
    form: null,
    params: null,
  } as IORequest;
};

export { requestListWines, requestWine, requestAddWine, requestUpdateWine, requestRemoveWine };
