import {
  createCourse as apiCreateCourse,
  syncCourseCurriculum as apiSyncCourseCurriculum,
  fetchCategories as apiFetchCategories,
  fetchEducators as apiFetchEducators,
  uploadThumbnail as apiUploadThumbnail,
  type ApiCategory,
  type ApiEducator,
  type CreateCoursePayload,
  type SyncCurriculumPayload,
} from '@/lib/api/courses';

export type {
  ApiCategory,
  ApiEducator,
  CreateCoursePayload,
  SyncCurriculumPayload,
};

export const CourseService = {
  fetchCategories: async (): Promise<ApiCategory[]> => {
    return apiFetchCategories();
  },

  fetchEducators: async (): Promise<ApiEducator[]> => {
    return apiFetchEducators();
  },

  uploadThumbnail: async (file: File): Promise<string> => {
    return apiUploadThumbnail(file);
  },

  createCourse: async (payload: CreateCoursePayload) => {
    return apiCreateCourse(payload);
  },

  syncCourseCurriculum: async (
    courseId: string,
    payload: SyncCurriculumPayload,
  ): Promise<void> => {
    return apiSyncCourseCurriculum(courseId, payload);
  },
};
