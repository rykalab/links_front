import axios from 'axios';
import store from './store'
import router from './router'

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

let interval = 0;

axios.interceptors.request.use(config => {
  if(!interval){
    interval = setInterval(() =>{
      store.state.loading = true
    }, 500);
  }
  const token = localStorage.getItem('token')
  if (token){
    config.headers.common['Authorization'] = `Bearer ${token}`
  }else {
    router.push({path:'/login'})
  }
  return config;
});

axios.interceptors.response.use(config => {
  if(interval){
    clearInterval(interval)
  }
  interval = 0
  store.state.loading = false
  return config
}, error => {
  if(error.response.status === 401){
    router.push({path:'/login'})
  }
});

