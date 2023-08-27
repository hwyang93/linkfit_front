import {fetchCommunityPost} from '@/api/community';
import {FetchCommunityPostResponse} from '@/types/api/community';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import toast from '../toast';

export const useCommunityPostQuery = (postId: number) => {
  const [data, setData] = useState<FetchCommunityPostResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const query = useCallback(async () => {
    console.log('fetching!');
    try {
      setIsLoading(true);
      const response = await fetchCommunityPost(postId);
      setData(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    query();
  }, [query]);

  return {data, isLoading, refetch: query};
};
