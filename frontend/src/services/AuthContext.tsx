import axios from "axios";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState, useReducer } from "react";
import { base_url, IORequest, IOResponse } from "../config/api";
import { ItemProps, reducerCart, ReducerCartAction } from "../models/Order";


interface INotification {
    status: 'success' | 'error'; message: string
}
interface IAuthContext {
    createNotification(data: INotification | null): void;
    notification: INotification | null;
    request({ url, method, form, params }: IORequest): IOResponse;
    cart: ItemProps[];
    updateCart: Dispatch<SetStateAction<ReducerCartAction>>;
    clearCart(): void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<Boolean>>;
    admin: boolean;
    setAdmin: Dispatch<SetStateAction<Boolean>>;
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

function useProvideAuth() {
    const [admin, setAdmin] = useState(false);
    const [cart, setCart] = useReducer(reducerCart, []);
    const [notification, setNotification] = useState<INotification | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        async function carregaStorage() {
            const sessionCart = await sessionStorage.getItem('@App:cart');
            if (sessionCart) {
                const cartObj = (JSON.parse(sessionCart) as ItemProps) || null;
                if (cartObj) {
                    await setCart({ type: 'add', payload: cartObj });
                }

            }
        }

        if (!cart.length) {
            // carregaStorage();
        }
        // clearCart();

    }, []);

    async function createNotification(data: INotification | null) {
        setNotification(data);
        setTimeout(() => setNotification(null), 5000)
    }

    // Função responsavel pelas requisições
    // 
    async function request({ url, method, form, params }: IORequest): Promise<IOResponse> {
        setLoading(true);
        const response = await axios({
            baseURL: `${base_url}/api`,
            headers: {
                'Content-Type': 'application/json',
            },
            url,
            method,
            params,
            data: form,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response.data.message) {
                    createNotification({ status: 'error', message: error.response.data.message })
                } else {
                    console.error(error.response.data);
                    createNotification({ status: 'error', message: "Ocorreu um erro ao fazer a requisição. Verifique o console para mais informações." });
                }

                return false;
            });

        setLoading(false);
        return response as IOResponse;
    };


    async function updateCart(data: ReducerCartAction) {
        setLoading(true);
        await setCart(data);
        setLoading(false);
        // setTimeout(() => sessionStorage.setItem('@App:cart', JSON.stringify(cart)), 500);
    }

    async function clearCart() {
        setCart({ type: 'clear' });
        createNotification({ status: "success", message: 'Carrinho limpo.' })
        // sessionStorage.removeItem('@App:cart');
    }

    return {
        cart,
        updateCart,
        clearCart,
        createNotification,
        notification,
        request,
        loading,
        setLoading,
        admin,
        setAdmin
    }
}
const AuthProvider: React.FC = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export { AuthContext, AuthProvider, useAuth };