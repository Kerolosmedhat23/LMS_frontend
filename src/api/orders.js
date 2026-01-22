import api from './client';

// Orders
export async function createOrder(payload = {}) {
  const { data } = await api.post('/orders', payload);
  return data.order;
}

export async function listUserOrders(userId) {
  const { data } = await api.get(`/users/${userId}/orders`);
  return data.orders;
}

export async function getOrder(orderId) {
  const { data } = await api.get(`/orders/${orderId}`);
  return data.order;
}

export async function completeOrder(orderId) {
  const { data } = await api.put(`/orders/${orderId}/complete`);
  return data.order;
}

export async function cancelOrder(orderId) {
  const { data } = await api.put(`/orders/${orderId}/cancel`);
  return data.order;
}

// Order items
export async function addCourseToOrder(payload) {
  const { data } = await api.post('/order-items', payload);
  return data;
}

export async function getOrderItems(orderId) {
  const { data } = await api.get(`/orders/${orderId}/items`);
  // Backend returns { order: { id, total_amount, status, orderItems: [...] } }
  return data.order;
}

export async function removeOrderItem(orderItemId) {
  const { data } = await api.delete(`/order-items/${orderItemId}`);
  return data;
}

// Enrollments
export async function getEnrollments() {
  const { data } = await api.get('/enrollments');
  return data.enrollments;
}

export async function getEnrollment(enrollmentId) {
  const { data } = await api.get(`/enrollments/${enrollmentId}`);
  return data.enrollment;
}

export async function checkEnrollment(courseId) {
  const { data } = await api.get(`/courses/${courseId}/check-enrollment`);
  return data;
}
export async function removeEnrollment(enrollmentId) {
  const { data } = await api.delete(`/enrollments/${enrollmentId}`);
  return data;
}