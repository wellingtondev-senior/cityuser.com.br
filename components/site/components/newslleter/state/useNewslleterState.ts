import { create } from 'zustand'

const useNewslleterState = create((set) => ({
   activeWindow: false, //QUANDO A JANELA FOR CHAMADA
   waterLevel: "",
   corStatus: "",
   imagemPath:"",
   identificadorId:0,
   setIdentificadorId:(id:number)=>{
      set({
         identificadorId:id
      })
   },
   setImagemPath:(path:string)=>{
    set({imagemPath:path})
   },
   setCorStatus: (cor: string) => {
      set({ corStatus: cor })
   },
   setWaterLevel: (waterLevel: string) => {
      set({ waterLevel: waterLevel })
   },
   setActiveWindow: (bool:boolean) => {
      set({activeWindow: bool})
      
   }


}));



export default useNewslleterState;