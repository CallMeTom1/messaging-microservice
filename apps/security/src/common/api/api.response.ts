import {MicroserviceCodeResponse} from "./enum";

export interface ApiResponse {
  code: MicroserviceCodeResponse;
  data: any;
  result: boolean;
}