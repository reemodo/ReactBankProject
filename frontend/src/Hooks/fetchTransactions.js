import useSWR from 'swr'
import { useState, useEffect } from 'react';
const fetcher = async(url) =>{
  const response = await fetch(url);
    const data = await response.json();
    return data;
}
function useUrlFetcher(shouldFetch, url) {

    const { data, error } = useSWR(() => shouldFetch ? url : null , async(url) =>{
      const response = await fetch(url);
        const data = await response.json();
        return data;
})
const [fetchedData, setFetchedData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (data) {
    setFetchedData(data);
    setIsLoading(false);
  }
}, [data]);


    return {
      fetchedData,
      isError: error,
      isLoading
    }
  }
export default useUrlFetcher;