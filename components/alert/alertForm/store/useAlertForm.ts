import { create } from 'zustand'


type useAlertFormType = {
    stateVisibleSuccess: boolean,
    stateVisible: boolean,
    stateTitulo: string
    actionOpen: (title: string, color:string) => void;
    actionClose: () => void;
    actionOpenSuccess:(title: string, color:string) => void;
    actionCloseSuccess:() => void;
}

const useAlertForm = create((set): useAlertFormType => ({
    stateVisibleSuccess: false,
    stateVisible: false,
    stateTitulo: "",
    actionOpen: (title:string, color:string) =>{
        set({
            stateVisibleSuccess: false,
            stateVisible: true,
            stateTitulo: title,
        })
        setTimeout(()=>{
            set({
                stateVisibleSuccess: false,
                stateVisible: false,
                stateTitulo:"",
            })
        },8000) 
    },
    actionClose: () => {
        
        set({
            stateVisibleSuccess: false,
            stateVisible: false,
            stateTitulo:"",
        })
        
    },
    actionOpenSuccess: (title:string, color:string) =>{
        set({
            stateVisible: false,
            stateVisibleSuccess: true,
            stateTitulo: title,
        })
        setTimeout(()=>{
            set({
                stateVisibleSuccess: false,
                stateVisible: false,
                stateTitulo:"",
            })
        },8000) 
    },
    actionCloseSuccess: () => {
        set({
            stateVisible: false,
            stateVisibleSuccess: false,
            stateTitulo:"",
        })
    }
    
}
)
);



export default useAlertForm;