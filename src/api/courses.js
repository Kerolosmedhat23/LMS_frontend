import api from './client';

export async function listCourses() {
  const { data } = await api.get('/courses');
  return data;
}

export async function getCourse(id) {
  const { data } = await api.get(`/courses/${id}`);
  return data;
}

export async function getSections(courseId) {
  const { data } = await api.get(`/courses/${courseId}/sections`);
  return data;
}

export async function getLectures(sectionId) {
  const { data } = await api.get(`/sections/${sectionId}/lectures`);
  return data;
}

export async function createSection(courseId, payload) {
  const { data } = await api.post(`/courses/${courseId}/sections`, payload);
  return data.section;
}

export async function createLecture(sectionId, payload) {
  const { data } = await api.post(`/sections/${sectionId}/lectures`, payload);
  return data.lecture;
}

export async function uploadLectureVideo(file) {
  const formData = new FormData();
  formData.append('video', file);
  const { data } = await api.post('/lectures/upload-video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // Backend returns { video_url: '...', message: '...' }
  return data.video_url;
}
