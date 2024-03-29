import useSWR from 'swr'
const fetcher = async url => {
  const res = await fetch(url,{
    method: 'Get',
  })
 
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  const data = await res.json()
  return data
}
function useUrlFetcher(url) {
  const { data, error, isLoading } = useSWR(url , fetcher,{shouldRetryOnError: false})

  
  return {
    fetchedData : data,
    error,
    isLoading
  }
}
export default useUrlFetcher;