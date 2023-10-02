import { memberApi } from '@/api/member';
import { UpdateProfileBody } from '@/types/api/member.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LINKS = {
  seq: null,
  type: '',
  url: '',
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateProfileBody) => {
      const formData = new FormData();

      formData.append('nickname', body.nickname);
      formData.append('intro', body.intro);
      formData.append('links', LINKS);
      if (body.imageObj && body.imageObj.uri) {
        formData.append('file', body.imageObj);
      }

      return memberApi.updateProfile(formData);
    },

    onSuccess: () => queryClient.invalidateQueries(['member']),
  });
};
