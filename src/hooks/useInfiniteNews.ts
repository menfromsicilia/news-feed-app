import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { useLazyGetNewsPostsQuery } from '@/features/news/api/newsApi';
import { 
  setInfiniteScrollLoading, 
  appendPosts, 
  resetInfiniteScroll,
  setHasMore 
} from '@/features/news/store/newsFiltersSlice';
import type { NewsPost } from '@/types/news';

interface UseInfiniteNewsResult {
  posts: NewsPost[];
  hasMore: boolean;
  isLoading: boolean;
  isError: boolean;
  fetchMore: () => void;
  refresh: () => void;
}

export const useInfiniteNews = (): UseInfiniteNewsResult => {
  const dispatch = useAppDispatch();
  const { filters, infiniteScroll } = useAppSelector(state => state.newsFilters);
  
  const [triggerGetPosts, { isLoading, isError }] = useLazyGetNewsPostsQuery();

  const shouldLoadAll = filters.selectedTags.length > 0;

  const fetchMore = useCallback(async () => {
    if (infiniteScroll.isLoading || !infiniteScroll.hasMore) {
      return;
    }

    dispatch(setInfiniteScrollLoading(true));

    try {
      const params = {
        q: filters.search || undefined,
        sortBy: filters.sortBy,
        order: filters.sortOrder,
        limit: shouldLoadAll ? 100 : 10,
        skip: shouldLoadAll ? 0 : infiniteScroll.skip,
      };

      const result = await triggerGetPosts(params).unwrap();

      if (shouldLoadAll) {
        dispatch(resetInfiniteScroll());
        dispatch(appendPosts(result));
        dispatch(setHasMore(false));
      } else {

        dispatch(appendPosts(result));
        if (result.length < 10) {
          dispatch(setHasMore(false));
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      dispatch(setHasMore(false));
    } finally {
      dispatch(setInfiniteScrollLoading(false));
    }
  }, [
    dispatch,
    triggerGetPosts,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    filters.selectedTags,
    infiniteScroll.skip,
    infiniteScroll.isLoading,
    infiniteScroll.hasMore,
    shouldLoadAll,
  ]);

  const refresh = useCallback(() => {
    dispatch(resetInfiniteScroll());
  }, [dispatch]);

  useEffect(() => {
    if (infiniteScroll.skip === 0 && infiniteScroll.allPosts.length === 0 && !infiniteScroll.isLoading) {
      fetchMore();
    }
  }, [
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    filters.selectedTags.length,
    infiniteScroll.skip,
    infiniteScroll.allPosts.length,
    infiniteScroll.isLoading,
    fetchMore,
  ]);

  const filteredPosts = filters.selectedTags.length > 0
    ? infiniteScroll.allPosts.filter(post =>
        filters.selectedTags.some(selectedTag =>
          post.tags.includes(selectedTag)
        )
      )
    : infiniteScroll.allPosts;

  return {
    posts: filteredPosts,
    hasMore: infiniteScroll.hasMore,
    isLoading: infiniteScroll.isLoading || isLoading,
    isError: isError,
    fetchMore,
    refresh,
  };
};