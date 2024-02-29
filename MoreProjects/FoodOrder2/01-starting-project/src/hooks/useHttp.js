import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){ // this function is in general dealing with sending request
   const response =  await fetch(url, config);

   const resData = await response.json();
   if(!response.ok){
    throw new Error(resData.message || 'Something went wrong, failed to send request'); // even if the response has an error code, it will still carry some data

   }
   return resData; 
}
export default function useHttp(url, config, initialData){

    const[data, setData] = useState(initialData);//we get some data from the backend, thats our success case
    const [isLoading, setIsLoading] = useState();//loading State
   const[error, setError]  =  useState(); //manage the error state

   function clearData(){
    setData(initialData);
   }

  const sendRequest =  useCallback (async function sendRequest(data){ //useCallback to not be an infinite loop, only be re-created when its dependencies change, should accept the data if any data is needed and metge into this config
        setIsLoading(true); //we are about to send a request
        try{
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        }
        catch (error){  // in sendHttpRequest we throw error
        setError(error.message || 'Something went wrong!');
        }

        setIsLoading(false);

      
    }, [url,config]);//this function will be about updating some state based on the request status

    useEffect(() => {
        if((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest();
        }
    }, [sendRequest, config]);

    return{ //return an object where we expose the data, the loading state and the error state to whichever component is using this custom hook, so whichever component uses this hook can use this data, loadingstate and error state
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }

}