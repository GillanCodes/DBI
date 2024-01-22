import { ComponentProps, PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from "react";
import Toast from "./Toast";

type Params = ComponentProps<typeof Toast>

const defaultPush = (toast: Params) => {}

const defaultValue = {
    pushToastRef: {current: defaultPush}
}

const ToastContext = createContext(defaultValue);

export function ToastContextProvider({children}: PropsWithChildren)
{
    const pushToastRef = useRef(defaultPush);
    return <ToastContext.Provider value={{pushToastRef}}>
        <Toasts />
        {children}
    </ToastContext.Provider>
}

export function useToasts()
{
    const {pushToastRef} = useContext(ToastContext);
    return {
        pushToast: useCallback(
            (toast: Params) => {
                pushToastRef.current(toast);
            }, 
            [pushToastRef]
        )
    }
}

function Toasts()
{
    const [toasts, setToasts] = useState([] as Params[]);
    const { pushToastRef } = useContext(ToastContext);
    pushToastRef.current = (toast: Params) => {
        setToasts(v => [...v, toast]);
    }
    return <div className="toast-container">
        {toasts.map((toast, k) => {
            return <Toast {...toast} key={k} />
        })}
    </div>  
}