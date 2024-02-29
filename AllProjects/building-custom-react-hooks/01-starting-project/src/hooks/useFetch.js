import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue){//povikuvanje bidejki funckitite koi poicnuvaat so use se tretirani kako hooks, sakam dr komponentit da go nasleduvaat

    //to manage also all the realted state

    const [isFetching, setIsFetching] = useState();
    const [error, setError] =  useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn(); //must prinese a promise
            setFetchedData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);
    

    return { // we can return an  object, array , just a number
            isFetching,
            setFetchedData,
            fetchedData,
            error

    }
} 