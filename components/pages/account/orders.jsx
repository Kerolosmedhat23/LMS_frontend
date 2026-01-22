import React, { useEffect, useState } from "react";
import Layout from "../../common/layout.jsx";
import { useAuth } from "../../../src/hooks/useAuth.js";
import { listCourses } from "../../../src/api/courses.js";
import { 
  listUserOrders,
  getOrderItems,
  completeOrder,
  cancelOrder,
  removeOrderItem,
  addCourseToOrder,
  createOrder
} from "../../../src/api/orders.js";

const statusStyles = {
  pending: { background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' },
  completed: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
  cancelled: { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' },
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({});
  const [itemsByOrder, setItemsByOrder] = useState({});
  const [actionLoading, setActionLoading] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [cartOrderId, setCartOrderId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
      fetchCourses();
      ensureCartOrder();
    }
  }, [user?.id]);

  useEffect(() => {
    // When cart order ID is set, automatically fetch its items
    if (cartOrderId) {
      fetchItems(cartOrderId);
      setExpanded(prev => ({ ...prev, [cartOrderId]: true })); // Auto-expand cart
    }
  }, [cartOrderId]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listUserOrders(user.id);
      setOrders(data || []);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await listCourses();
      setAllCourses(data.courses || []);
    } catch (err) {
      console.error('Failed to load courses', err);
    }
  };

  const ensureCartOrder = async () => {
    try {
      const data = await listUserOrders(user.id);
      const pendingOrder = data?.find(o => o.status === 'pending');
      if (pendingOrder) {
        setCartOrderId(pendingOrder.id);
        // Fetch items for existing cart
        await fetchItems(pendingOrder.id);
      } else {
        // Create a new cart order
        const newOrder = await createOrder({});
        setCartOrderId(newOrder.id);
      }
    } catch (err) {
      console.error('Failed to ensure cart order', err);
    }
  };

  const fetchItems = async (orderId) => {
    try {
      const order = await getOrderItems(orderId);
      console.log('Order items response:', order);
      // Backend returns order with orderItems property
      const items = order?.order_items || order?.orderItems || [];
      console.log('Extracted items:', items);
      setItemsByOrder(prev => ({ ...prev, [orderId]: items }));
    } catch (err) {
      console.error('Failed to load order items', err);
    }
  };

  const toggleOrder = (orderId) => {
    setExpanded(prev => ({ ...prev, [orderId]: !prev[orderId] }));
    if (!itemsByOrder[orderId]) {
      fetchItems(orderId);
    }
  };

  const handleRemoveItem = async (orderId, orderItemId) => {
    if (!window.confirm('Remove this course from cart?')) {
      return;
    }
    setActionLoading(orderItemId);
    try {
      console.log('Removing item:', orderItemId);
      await removeOrderItem(orderItemId);
      console.log('Item removed successfully');
      await fetchOrders();
      await fetchItems(orderId);
    } catch (err) {
      console.error('Remove item failed', err);
      alert('Failed to remove item: ' + (err?.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (orderId) => {
    if (!window.confirm('Complete your order and enroll in all courses?')) {
      return;
    }
    setActionLoading(orderId);
    try {
      console.log('Completing order:', orderId);
      await completeOrder(orderId);
      console.log('Order completed successfully');
      alert('✅ Order completed! You are now enrolled in all courses.');
      await fetchOrders();
      await ensureCartOrder();
    } catch (err) {
      console.error('Complete order failed', err);
      alert('Failed to complete order: ' + (err?.response?.data?.message || err.message));
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (orderId) => {
    setActionLoading(orderId);
    try {
      await cancelOrder(orderId);
      await fetchOrders();
    } catch (err) {
      console.error('Cancel order failed', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddCourse = async (courseId) => {
    if (!cartOrderId) {
      alert('Cart not available. Please refresh the page.');
      return;
    }
    
    setActionLoading(`add-${courseId}`);
    try {
      const course = allCourses.find(c => c.id === courseId);
      await addCourseToOrder({
        order_id: cartOrderId,
        course_id: courseId,
        price: course?.price || 0,
      });
      alert(`${course?.title || 'Course'} added to cart!`);
      // Refresh orders and cart items
      await fetchOrders();
      await fetchItems(cartOrderId);
    } catch (err) {
      console.error('Failed to add course', err);
      alert('Failed to add course to cart');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1>Shopping Cart & Orders</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Add courses to your cart and complete your order.</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Shopping Cart Section */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>🛒 Your Shopping Cart</h2>
            {cartOrderId && orders.find(o => o.id === cartOrderId) && (
              <div className="card" style={{ padding: '1.5rem' }}>
                {(() => {
                  const cartOrder = orders.find(o => o.id === cartOrderId);
                  const cartItems = itemsByOrder[cartOrderId] || [];
                  
                  return (
                    <>
                      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ marginBottom: '0.5rem' }}>Cart Total: ${cartOrder?.total_amount || 0}</h3>
                          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{cartItems.length} item(s)</p>
                        </div>
                        <button 
                          className="btn btn-success"
                          onClick={() => setShowAddCourse(!showAddCourse)}
                        >
                          {showAddCourse ? '✕ Close' : '+ Add Course'}
                        </button>
                      </div>

                      {/* Cart Items */}
                      {cartItems.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>Your cart is empty. Add courses below!</p>
                      ) : (
                        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                          {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', borderLeft: '4px solid var(--primary-color)' }}>
                              <div>
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.course?.title || 'Course'}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>${item.price}</div>
                              </div>
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => handleRemoveItem(cartOrderId, item.id)}
                                disabled={actionLoading === item.id}
                              >
                                {actionLoading === item.id ? 'Removing...' : '✕'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Course Section */}
                      {showAddCourse && (
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                          <h4 style={{ marginBottom: '1rem' }}>Select Courses to Add:</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {allCourses.filter(c => !cartItems.some(item => item.course_id === c.id)).map(course => (
                              <div key={course.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                  <h5 style={{ marginBottom: '0.5rem' }}>{course.title}</h5>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{course.category?.name}</p>
                                  <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>${course.price || 'FREE'}</p>
                                </div>
                                <button 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleAddCourse(course.id)}
                                  disabled={actionLoading === `add-${course.id}`}
                                >
                                  {actionLoading === `add-${course.id}` ? 'Adding...' : 'Add to Cart'}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Checkout */}
                      {cartItems.length > 0 && (
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                          <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => handleComplete(cartOrderId)}
                            disabled={actionLoading === cartOrderId}
                          >
                            {actionLoading === cartOrderId ? 'Processing...' : '✓ Complete Order'}
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Order History Section */}
          <div>
            <h2 style={{ marginBottom: '1rem' }}>📦 Order History</h2>
            {orders.filter(o => o.status !== 'pending').length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No completed orders yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {orders.filter(o => o.status !== 'pending').map((order, index) => (
                  <div key={order.id} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ marginBottom: '0.25rem' }}>Order #{orders.filter(o => o.status !== 'pending').indexOf(order) + 1}</h3>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Total: ${order.total_amount ?? 0}</p>
                      </div>
                      <span className="badge" style={statusStyles[order.status] || {}}>{order.status.toUpperCase()}</span>
                    </div>

                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => toggleOrder(order.id)}
                    >
                      {expanded[order.id] ? '▼ Hide Courses' : '▶ View Courses'}
                    </button>

                    {expanded[order.id] && (
                      <div style={{ marginTop: '1rem' }}>
                        {(itemsByOrder[order.id] || []).length === 0 ? (
                          <p style={{ color: 'var(--text-secondary)' }}>No courses in this order.</p>
                        ) : (
                          <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {itemsByOrder[order.id].map(item => (
                              <div key={item.id} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-md)', borderLeft: '3px solid var(--success-color)' }}>
                                <div style={{ fontWeight: 600 }}>{item.course?.title || 'Course'}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>${item.price}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
