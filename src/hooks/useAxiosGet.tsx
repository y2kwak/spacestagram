import * as React from 'react';
import axios from 'axios';


export function useAxiosGet(url: string){
  const [request, setRequest] = React.useState({
    loading: false,
    data: null,
    error: false,
  })  
  React.useEffect(() => {
    setRequest({
        loading: true,
        data: null,
        error: false,
    })
    axios.get(url)
    .then(response => {
        setRequest({
            loading:false,
            data: response.data,
            error: false,
        })
    })
    .catch(error => {
        setRequest({
            loading:false,
            data: null,
            error: true,
        })
    })
  }, [url])
    
  return request
}
