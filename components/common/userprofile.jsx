import { useAuth } from '../../src/hooks/useAuth';

const UserProfile = ({ isHeaderVersion = true }) => {
  const { user, loading, error, logout, isAuthenticated } = useAuth();

  if (loading) {
    return isHeaderVersion ? null : <div style={{ padding: '1rem', textAlign: 'center' }}>Loading user...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '1rem', color: '#dc2626', textAlign: 'center' }}>
        Error: {error}
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  if (isHeaderVersion) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '0.875rem' }}>{user.name}</p>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
            {user.role}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Full version for dashboard/profile pages
  return (
    <div style={{
      padding: '1.5rem',
      background: '#f3f4f6',
      borderRadius: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <p style={{ margin: 0, fontWeight: '600' }}>{user.name}</p>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
          {user.email}
        </p>
        {user.role && (
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
            Role: <strong>{user.role}</strong>
          </p>
        )}
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '0.5rem 1rem',
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
