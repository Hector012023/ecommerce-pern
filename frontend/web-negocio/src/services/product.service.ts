import {api} from './api';


export const getProducts = async ()=>{
    const res = await api.get('/api/products');
    return res.data;
}