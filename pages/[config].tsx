import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";



const upButton = "";
const upContainer = ""
const downButton = "";
const downContainer = ""

const Config = () => {

  const [isUpDowSend, setIsUpDowSend] = useState(false)
  const [isUpDowAddress, setIsUpDowAddress] = useState(false)
  const router = useRouter();
  const { id, app } = router.query;


  console.log(app)

  function ButtonApp() {
    const telegramURL = process.env.NEXT_PUBLIC_TELEGRAMURL;
    const whatsappURL = process.env.NEXT_PUBLIC_WHATSAPP
    switch (app) {
      case "telegram":
        return (
          <button onClick={() => { 
            window.open(telegramURL, '_blank');
          }} type="button" className="mt-4 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
            <FaTelegramPlane />
            <span className="mx-2">Telegram</span>
          </button>
        )
        break;

      case "whatsapp":

        break;

    }
  }




  return (
    <section className="w-full h-full flex flex-col items-center justify-center py-10 space-y-2">
      <div className="w-full h-[80px] pt-4  flex items-center justify-center">
        <div className="w-[250px] h-[90px]" style={{
          backgroundImage: "url('/assets/logo2.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain"

        }}>

        </div>
      </div>
      <section className="w-[60%] md:w-[96%] rounded-3xl shadow-2xl">
        <div className="p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Informações sobre o dispositivo atual
          </p>
          {/* <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-2">
            <span className="w-[50%] text-right font-semibold">Dispositivo:</span>
            <span className="w-[50%] text-left font-bold ml-2 text-[14px]">SCDT</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-2">
            <span className="w-[50%] text-right font-semibold">Ponto Monitorado:</span>
            <span className="w-[50%] text-left font-bold ml-2 text-[14px]">Av Presidente Vargas - Rio de Janeiro - RJ:</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-2">
            <span className="w-[50%] text-right font-semibold">Informações:</span>
            <span className="w-[50%] text-left  ml-2 font-bold text-[14px]">É importante lembrar que o dispositivo </span>
          </div> */}

          <h2 className="w-full mt-6 text-2xl font-bold">
            É preciso que seja autorizado para receber mensagem no aplicativo
          </h2>
          <span className="font-semibold text-[12px] my-2">ao abrir o aplicativo de mensagem copie e cole a palvra secreta abaixo</span>
          <div className="mt-4 w-full h-[60px] bg-gray-200 rounded-lg shadow-lg flex items-center px-10">
                <span className="font-semibold">PALAVRA SECRETA:</span>
                <span className="font-bold ml-4">{`DISP-${id ? id : "NOID"}`}</span>
              </div>
          <ButtonApp />

        </div>
      </section>
      {/* <article classNameName="md:w-[96%] w-[70%]">
        <div classNameName="space-y-4">
          <details
            classNameName="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary classNameName="flex cursor-pointer items-center justify-between gap-1.5">
              <h2 classNameName="text-[20px] font-medium text-gray-900">
                Informações Sobre o dispositivo e ponto de monitoramento?
              </h2>

              <span classNameName="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">

              </span>
            </summary>

            <div>

            </div>
          </details>

        
            <summary classNameName="flex cursor-pointer items-center justify-between gap-1.5">
              <h2 classNameName="text-[20px] font-medium text-gray-900">
                Para autorizar seu aplicativo a receber os alertas, é necessário enviar a palavra secreta referente ao ponto de monitoramento.
              </h2>

              <span classNameName="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <button classNameName="text-gray-600 text-[20px] bg-transparent">
                  <BsArrowDownCircle/>
                </button>
              </span>
            </summary>

            <div>
              <span>

              </span>
              <div classNameName="w-full h-[60px] bg-gray-200 rounded-lg shadow-lg flex items-center px-10">
                <span classNameName="font-semibold">PALAVRA SECRETA:</span>
                <span classNameName="font-bold ml-4">{`DISP-${id}`}</span>
              </div>
              <button onClick={() => { }} type="button" classNameName="mt-2 w-full h-[40px] flex justify-center items-center  bg-[#3390EC] hover:bg-[#3390EC] focus:ring-[#3f7ebd] focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                <FaTelegramPlane />
                <span classNameName="mx-2">Telegram</span>
              </button>
            </div>
         
        </div>
      </article> */}

    </section>
  );
}

export default Config;