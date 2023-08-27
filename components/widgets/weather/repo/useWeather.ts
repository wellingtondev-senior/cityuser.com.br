import { QueryFunctionContext, useQuery } from "react-query";
import axios from 'axios'



async function getWeather(ctx: QueryFunctionContext) {
  const [queryKey, longitude, latitude, access_token] = ctx.queryKey;
  let isErro: boolean = false;
  let response: any = '';
  try {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=${access_token}`);
    response = data;
  } catch (error: any) {
    isErro = true;
    response = error.message;
  }
  return { isErro, response }

}


export function useFetchGetWeather(longitude:number, latitude:number, access_token:string) {
  return useQuery(['alert', longitude, latitude, access_token], getWeather);
}


