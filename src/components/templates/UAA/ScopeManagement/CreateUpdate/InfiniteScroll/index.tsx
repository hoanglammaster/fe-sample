import React, { useState, useEffect, useRef } from 'react'

const InfiniteScrollingDiv = () => {
  const [items, setItems] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const scrollContainerRef = useRef<any>(null)

  useEffect(() => {
    // Function to fetch more items from API
    const fetchMoreItems = async () => {
      setLoading(true)
      try {
        // Make API call to fetch more items, for example:
        // const response = await fetch(`https://api.example.com/items?page=${page}`);
        // const data = await response.json();
        // setItems(prevItems => [...prevItems, ...data.items]);

        // For demonstration, let's simulate API call with a timeout
        console.log('RunScroll')
        setTimeout(() => {
          const newItems = Array.from(
            { length: 10 },
            (_, index) => `Item ${page * 10 + index}`
          )
          setItems((prevItems) => [...prevItems, ...newItems])
          setPage((prevPage) => prevPage + 1)
          setLoading(false)
          //   setHasMore(page < 5) // Example: Stop fetching after 5 pages
        }, 1000)
      } catch (error) {
        console.error('Error fetching more items:', error)
        setLoading(false)
      }
    }

    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop
      const scrollHeight = scrollContainerRef.current.scrollHeight
      const clientHeight = scrollContainerRef.current.clientHeight
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight

      if (scrolledToBottom && !loading && hasMore) {
        fetchMoreItems()
      }
    }

    scrollContainerRef.current.addEventListener('scroll', handleScroll)
    return () =>
      scrollContainerRef?.current?.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, page])

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc' }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{ padding: '10px', borderBottom: '1px solid #eee' }}
        >
          {item}
        </div>
      ))}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more items to load</div>}
    </div>
  )
}

export default InfiniteScrollingDiv
