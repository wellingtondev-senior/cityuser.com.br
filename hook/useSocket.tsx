import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url:string, options = {}) => {

  const [isSocker, setIsSocker] = useState<any>();

  useEffect(() => {
    // Inicializar o socket quando o componente é montado
    const socketRef = io(url,  { transports: ['websocket'] });
    setIsSocker(socketRef)
    // Fechar o socket quando o componente é desmontado
    return () => {
      socketRef.close();
    };
  }, [url, options]);

  return isSocker;
};

export default useSocket;