import axios from "axios";

import cors from "cors";

//Alterar endereço ou porta conforme necessidade
const base_url =
  process.env.NODE_ENV === "development"
    ? "http://softwine.local"
    : "http://localhost:8000";

export interface IORequest {
  url: string;
  method: string;
  form: {} | null;
  params: {} | null;
}

export interface IOResponse {
  status: "success" | "error";
  data?: [];
  message?: string;
}

export { base_url };
