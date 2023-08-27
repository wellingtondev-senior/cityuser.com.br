import { useEffect, useRef, useState } from 'react';
import useAlertForm from '../../alert/alertForm/store/useAlertForm';
import { useAdreessClick } from './store/useAdreess.store';
import SearchComponent from './components/search';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import AlertForm from '../../alert/alertForm/alertForm';
import PageSteps from './components/steps';

const DynamicMap = dynamic(() => import('./components/map'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})


const Indentificador = ({ data, close }: any) => {

    const router = useRouter();
    const state = useAlertForm((state: any) => state);
    const [ispop, setIsPop] = useState(false);
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });






    return (
        <section className="w-full h-full fixed  top-0 left-0 right-0 bottom-0" id="mapa">
            <DynamicMap places={data?.dispositivo} />
            <SearchComponent />
            <AlertForm visible={state.stateVisible} title="mensagem de teste" />
            <PageSteps dispositivo={data.dispositivo} />
        </section>
    );
}

export default Indentificador;


