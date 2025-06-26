const { ref: loadMoreRef } = useInView({
  threshold: 0.5,
  onChange: (inView) => {
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }
}); 