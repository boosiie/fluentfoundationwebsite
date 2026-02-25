import { useEffect, useMemo, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import './AdminUsersPage.css';

const roleOptions = ['ADMIN', 'CONTRIBUTOR', 'MEMBER'];

function AdminUsersPage() {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [dirtyRoles, setDirtyRoles] = useState({});

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      setDirtyRoles({});
      return;
    }

    const controller = new AbortController();
    async function fetchUsers() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        params.set('q', searchTerm.trim());
        const response = await fetch(`/api/admin/users?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to fetch users');
        }
        const payload = await response.json();
        setUsers(payload);
        setDirtyRoles({});
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message ?? 'Unable to load users');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, [searchTerm, token]);

  const handleRoleChange = (userId, nextRole) => {
    setDirtyRoles((prev) => ({ ...prev, [userId]: nextRole }));
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u)));
  };

  const hasPendingChanges = useMemo(() => Object.keys(dirtyRoles).length > 0, [dirtyRoles]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const updates = Object.entries(dirtyRoles);
      for (const [userId, role] of updates) {
        const response = await fetch(`/api/admin/users/${userId}/role`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        });
        if (!response.ok) {
          throw new Error(`Failed to update role for user ${userId}`);
        }
      }
      setDirtyRoles({});
    } catch (err) {
      setError(err.message ?? 'Unable to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page admin-users">
      <h2>User Administration</h2>
      <p className="admin-users__intro">
        Search by email, name, or role to manage Fluent Foundation accounts. Update roles as needed,
        then save your changes.
      </p>
      <div className="admin-users__search">
        <label htmlFor="user-search">Search users</label>
        <input
          id="user-search"
          type="search"
          placeholder="Start typing an email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="admin-users__error">{error}</p>}

      <div className="admin-users__table-wrapper">
        {loading ? (
          <p className="admin-users__loading">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="admin-users__empty">{searchTerm ? 'No matching users found.' : 'Start by entering a search term.'}</p>
        ) : (
          <table className="admin-users__table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{[user.firstName, user.lastName].filter(Boolean).join(' ') || '—'}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(event) => handleRoleChange(user.id, event.target.value)}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-users__actions">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasPendingChanges || loading}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminUsersPage;
