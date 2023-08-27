import {create} from 'zustand'

const useMenu = create((set)=>({
  stateMenu: false,
  action: () => set((state: { stateMenu: boolean; }) => ({ stateMenu: !state.stateMenu})),
}));



export default useMenu;