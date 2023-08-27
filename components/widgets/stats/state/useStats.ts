import {create} from 'zustand'

const useStats = create((set)=>({
  dispositivoAtivos: 0,
  setDispositivoAtivos:(data:[])=>{
   for(let objeto of data){
    console.log(objeto)
   }
    return set({
        dispositivoAtivos: 1
    })
  }
}));



export default useStats;