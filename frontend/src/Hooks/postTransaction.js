import useSWR from 'swr'
const fetcher = async ( url) => {
  const res = await fetch(url[0],{
    method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(url[1])
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
function usePostUrlFetcher(shouldFetch, url, transactionData) {

  const { error,isLoading } = useSWR(() => shouldFetch ? [url , transactionData] : null, fetcher,{shouldRetryOnError: false})

  return {error,isLoading}
}
export default usePostUrlFetcher;