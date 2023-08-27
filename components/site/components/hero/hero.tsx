import Lottie from 'react-lottie-player'
import Header from "../header/header";
import dynamic from "next/dynamic";
import loadMap from '../../../../assets/lottie/load-mapa.json'

interface HeroProps {
    data: []
}

const MapaContainer = dynamic(() => 
import('../mapa/mapaContainer'), 

{
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
        <div className=" md:w-[100px] md:h-[100px] w-[300px] h-[300px]">
            <Lottie
            animationData={loadMap}
            play={true}
            loop={true}
        /></div>
        
    </div>
    ),
})


const Hero = ({ data }: HeroProps) => {

    function handlerClick(target:string, offsetTop:number){
       const section:any = document.querySelector(target);
       console.log(section.offsetTop)
       window.scroll({
        top:section.offsetTop - offsetTop,
        behavior:"smooth"
       })
    }


    return (
        <section className="w-full">
            <div className="bg-[#00A699] w-full" style={{
                        backgroundImage: "url('/assets/textura/liquid-cheese.svg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "repeat",
                        backgroundSize: "cover"
        
                    }}>
                <Header />
                <div className="container flex flex-col items-center px-4 py-10 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                    <h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl text-white">Seja o primeiro a saber onde está alagando! </h1>
                    <p className="mt-6 mb-8 text-lg font-semibold text-gray-200">Com nosso dispositivo inteligente, você recebe informações atualizadas em tempo real sobre os pontos de alagamento na sua região.</p>
                    <div className="flex flex-wrap justify-center">
                        <button onClick={()=>handlerClick("#mapa", 90)} type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded bg-[#177079] text-gray-50">Monitoramento em Tempo Real</button>
                        <button onClick={()=>handlerClick("#como-funciona", 0)} type="button" className="px-8 py-3 m-2 text-lg border rounded bg-[#C1FF72] border-[#bafa66] text-[#5e832f] font-semibold">Como funciona ?</button>
                    </div>
                </div>
            </div>
            <div className="w-[90%] md:h-[600px] h-[500px] mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-[#177079] cursor-pointer">
                <MapaContainer data={data} />

            </div>
        </section>
    );
}

export default Hero;