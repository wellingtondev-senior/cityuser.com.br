import {create} from 'zustand'

const useSearchZoom = create((set)=>({
  inputVisible:false,
  latitude: -22.661,
  longitude:-50.3995,
  zoom:15,
  setInputVisible:()=>{
    set((state:any)=>
    ({
      inputVisible:!state.inputVisible
    })
    )
  },
  setCord:(lat:number, lng:number)=>{
    return set((state:any)=>({
      latitude: lat,
      longitude:lng,
      zoom:17
    }))
  }
}));



export default useSearchZoom;