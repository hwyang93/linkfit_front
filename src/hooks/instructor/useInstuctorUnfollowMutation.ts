import {instructorApi} from '@/api/instructor';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useInstructorUnfollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instructorId: number) =>
      instructorApi.unfollowInstructor(instructorId),
    onSettled: () => queryClient.invalidateQueries(['instructor']),
  });
};