import { create } from 'zustand'
import Cookies from 'js-cookie';

const useLogin = create((set) => ({
  isLoggin: false,
  setIsLoggin: () => {
    set({
      isLoggin: true
    })
  },
  setIslogout: () => {
    Cookies.remove('token');
    window.location.reload();
    set({
      isLoggin: false
    })
  }

})
)

export default useLogin;
