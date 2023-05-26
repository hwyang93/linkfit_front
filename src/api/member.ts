import {
  CreateMemberDto,
  CreateMemberLicenceDto,
  CreateMemberReputationDto,
  CreateRegionAuthDto,
  UpdateMemberProfileDto,
  UpdateMemberReputationDto,
  UpdatePositionSuggestDto,
} from '@/types/api/dtos';
import {
  FetchCheckNicknameResponse,
  FetchMemberFollowingsParams,
  FetchMemberFollowingsResponse,
  FetchMemberInfoByEmailResponse,
  FetchMemberInfoBySeqResponse,
  FetchMemberInfoResponse,
  FetchMemberLicencesResponse,
  FetchMemberMyInfoResponse,
  FetchMemberReputationsResponse,
  FetchPositionSuggestResponse,
  FetchReceivePositionSuggestsParams,
  FetchReceivePositionSuggestsResponse,
  FetchRecruitByMemberResponse,
  FetchRegionAuthResponse,
  FetchSendPositionSuggestsParams,
  FetchSendPositionSuggestsResponse,
} from '@/types/api/member';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export function createMember(data: CreateMemberDto) {
  return request.post<PostResponse>('/member', data);
}

export function fetchMemberInfo() {
  return request.get<FetchMemberInfoResponse>('/member');
}

export function fetchMemberInfoByEmail(email: string) {
  return request.get<FetchMemberInfoByEmailResponse>(
    `/member/check/email/${email}`,
  );
}

export function fetchCheckNickname(nickname: string) {
  return request.get<FetchCheckNicknameResponse>(
    `/member/check/nickname/${nickname}`,
  );
}

export function fetchMemberMyInfo() {
  return request.get<FetchMemberMyInfoResponse>('/member/my');
}

// TODO: Response 타입 추가
export function updateProfile(data: UpdateMemberProfileDto) {
  return request.patch('/member/profile', data, {
    headers: {'content-type': 'multipart/form-data'},
  });
}

export function createRegionAuth(data: CreateRegionAuthDto) {
  return request.post<PostResponse>('/member/region', data);
}

export function fetchRegionAuth() {
  return request.get<FetchRegionAuthResponse>('/member/region');
}

export function deleteRegionAuth(seq: number) {
  return request.delete<DeleteResponse>(`/member/region/${seq}`);
}

export function fetchMemberLicences() {
  return request.get<FetchMemberLicencesResponse>('/member/licence');
}

export function createMemberLicence(data: CreateMemberLicenceDto) {
  return request.post<PostResponse>('/member/licence', data, {
    headers: {'content-type': 'multipart/form-data'},
  });
}

// TODO: Response 타입 추가
export function cancelMemberLicence(seq: number) {
  return request.patch(`/member/licence/${seq}`);
}

export function fetchMemberReputations() {
  return request.get<FetchMemberReputationsResponse>('/member/reputation');
}

export function createReview(data: CreateMemberReputationDto) {
  return request.post<PostResponse>('/member/reputation', data);
}

// TODO: Response 타입 추가
export function updateMemberReputation(
  seq: number,
  data: UpdateMemberReputationDto,
) {
  return request.patch(`/member/reputation/${seq}`, data);
}

export function deleteMemberReputation(seq: number) {
  return request.delete<DeleteResponse>(`/member/reputation/${seq}`);
}

export function fetchReceivePositionSuggests(
  params?: FetchReceivePositionSuggestsParams,
) {
  return request.get<FetchReceivePositionSuggestsResponse>(
    '/member/suggest/to',
    {params},
  );
}

export function fetchSendPositionSuggests(
  params?: FetchSendPositionSuggestsParams,
) {
  return request.get<FetchSendPositionSuggestsResponse>(
    '/member/suggest/from',
    {params},
  );
}

export function fetchPositionSuggest(seq: number) {
  return request.get<FetchPositionSuggestResponse>(`/member/suggest/${seq}`);
}

// TODO: Response 타입 추가
export function updatePositionSuggestStatus(
  seq: number,
  data: UpdatePositionSuggestDto,
) {
  return request.patch(`/member/suggest/${seq}`, data);
}

export function fetchMemberFollowings({type}: FetchMemberFollowingsParams) {
  return request.get<FetchMemberFollowingsResponse>(
    `/member/following/${type}`,
  );
}

export function fetchMemberInfoBySeq(seq: number) {
  return request.get<FetchMemberInfoBySeqResponse>(`/member/${seq}`);
}

export function fetchRecruitByMember(seq: number) {
  return request.get<FetchRecruitByMemberResponse>(`/member/${seq}/recruit`);
}
