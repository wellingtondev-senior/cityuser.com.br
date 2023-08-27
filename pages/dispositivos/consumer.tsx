import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { isTokenExpireVerefic } from "../../utils/tokenExpire";
import { parseCookie } from "../../utils/cookies";

const Cosumer = () => {
    return (
        <div>
            Enter
        </div>
    );
}

export default Cosumer;
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const cookies: { [key: string]: string } = parseCookie(ctx.req)
    const { token } = cookies;
 
   if(token){
 
    if(isTokenExpireVerefic(token)){
     return {
             redirect: {
               permanent: false,
               destination: "/login"
             }
           }
    }else {
      return { props:{token}}
    }
   }else{
     return {
       redirect: {
         permanent: false,
         destination: "/login"
       }
     }
   }
}