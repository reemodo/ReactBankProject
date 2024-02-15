import useSWR from 'swr'
const fetcher = async url => {
  const res = await fetch(url,{
    method: 'Delete',
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
function useDeleteUrlFetcher(shouldFetch, url) {

  const { error,isLoading } = useSWR(() => shouldFetch ? url : null, fetcher,{shouldRetryOnError: false})

  return {error,isLoading}
}
export default useDeleteUrlFetcher;