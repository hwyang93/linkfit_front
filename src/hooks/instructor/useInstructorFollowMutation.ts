import { instructorApi } from '@/api/instructor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useInstructorFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (instructorId: number) => instructorApi.followInstructor(instructorId),
    onSettled: () => queryClient.invalidateQueries(['instructor']),
  });
};
