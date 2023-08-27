import { useEffect, useState } from "react";
import { FaSearchLocation, FaMapMarkerAlt } from "react-icons/fa";
import { useFetchGetWeather } from "../../../widgets/weather/repo/useWeather";
import { get } from '../../http/http'
import useSearchZoom from "./useSearchZoom";
import useNewslleterState from "../newslleter/state/useNewslleterState";

const down = "absolute w-[85%]  right-[12.5%] left-[12.5%] top-[20px] flex flex-col transition-1 ease-in-out duration-700";
const up = "absolute w-[85%]  right-[12.5%] left-[12.5%] top-[-60px] flex flex-col transition-1 ease-in-out duration-700";
const popUpDown = "relative right-[12.5%] left-[12.5%] top-[10px] bg-white w-[80%] h-auto max-h-[400px] min-h-[100px] rounded-lg shadow-lg transition-1 ease-in-out duration-700 overflow-y-auto";
const popUpUp = "relative hidden right-[12.5%] left-[12.5%]  top-[10px] bg-white w-[80%] h-auto max-h-[400px] rounded-lg shadow-lg transition-1 ease-in-out duration-700 overflow-y-auto";

interface Props {
  visible: boolean
}

const SearchComponent = ({ visible }: Props) => {
  const useSearchZoomState = useSearchZoom((state:any)=>state);
  const useNewslleterStates = useNewslleterState((state:any)=>state);
  const [isPopUp, setPopUp] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState("");
  const [isResultSearch, setIsResultSearch] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function setMarker(lat:number, lng:number){
   useSearchZoomState.setCord(lat, lng)
  }



  async function searchSubmit() {
    if (isSearch != "") { 
      useNewslleterStates.setActiveWindow(false);
      setIsLoading(true);
      setPopUp(!isPopUp);
      const result = await get(isSearch);
      setIsResultSearch(result.message);
      setIsLoading(false);
     

    } else {
      alert("O campo de busca estar vazio");
    }
  }

  useEffect(() => {
    if (!visible) {
      setPopUp(false)
    }
  }, [visible])

  switch (visible) {
    case true:
      return (
        <div className={down}>
          <div className="relative   px-4 flex items-center justify-between w-[80%] h-[50px] m-auto bg-white rounded-full shadow-lg">
            <input type="text" name="search" onChange={(e) => {
              if (!e.target.value) {
                setPopUp(false);
              }
              setIsSearch(e.target.value)
            }} placeholder="CIDADE, UF" 
            className="w-[90%] rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400  text-base focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent" />
            <button onClick={searchSubmit} className=" flex items-center justify-center text-[25px]  w-[40px] h-[40px] rounded-full "><FaSearchLocation /></button>
          </div>
          <div className={`${isPopUp ? popUpDown : popUpUp}`}>
            {
              isLoading ?
                <div className="w-full h-[100px] flex items-center justify-center">
                  <div aria-label="Loading..." role="status">
                    <svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
                      <path
                        className="fill-indigo-200"
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                      <path
                        className="fill-indigo-800"
                        d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                    </svg>
                  </div>
                </div> :
                isResultSearch.length == 0 ?
                <div className="w-full h-[100px] flex items-center justify-center p-2">
                  <span className=" font-semibold text-[12px] text-gray-500">
                    No Momento nenhum ponto estar sendo monitorado
                  </span>
                </div> :
                isResultSearch.map((e: any, index: number) => {
                  return (
                    <button key={index} className="flex items-center p-4 border-b-[1px] mx-4 w-[90%] h-[50px]" onClick={()=>setMarker(e.item.latitude, e.item.longitude)}>
                      <div className="flex items-center justify-center text-[18px] w-[25px] h-[25px] "><FaMapMarkerAlt /></div>
                      <span className="font-semibold text-gray-700 mr-2">{ e.item.endereco } - </span>
                      <span className="font-semibold text-gray-700 mr-2">{ e.item.bairro } - </span>
                      <span className="font-semibold text-gray-700 mr-2">{ e.item.cidade } - </span>
                      <span className="font-bold text-gray-800">{ e.item.uf }</span>
                    </button>
                  );
                })

            }


          </div>
        </div>
      );
    case false:

      return (
        <div className={up}>
          <div className="relative   px-4 flex items-center justify-between w-[80%] h-[50px] m-auto bg-white rounded-full shadow-lg">
            <input type="text" name="search" placeholder="CIDADE, UF" className="w-[90%] rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400  text-base focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent" />

            <button className=" flex items-center justify-center text-[25px]  w-[40px] h-[40px] rounded-full "><FaSearchLocation /></button>
          </div>
         
        </div>
      );

      break;


  }


}

export default SearchComponent;