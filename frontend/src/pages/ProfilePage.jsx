import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import '../css/ProfilePage.css';

const BADGES = [
  { id: 'first_quiz',    emoji: '🎯', name: 'First Quiz',      desc: 'Complete your first quiz',        earned: true  },
  { id: 'streak_3',      emoji: '🔥', name: '3-Day Streak',    desc: 'Log in 3 days in a row',          earned: true  },
  { id: 'perfect_score', emoji: '⭐', name: 'Perfect Score',   desc: 'Get 100% on any quiz',            earned: true  },
  { id: 'contributor',   emoji: '✍️',  name: 'Contributor',    desc: 'Submit a quiz question',          earned: false },
  { id: 'streak_7',      emoji: '💫', name: '7-Day Streak',    desc: 'Log in 7 days in a row',          earned: false },
  { id: 'quiz_master',   emoji: '🏆', name: 'Quiz Master',     desc: 'Complete 10 quizzes',             earned: false },
  { id: 'social',        emoji: '🤝', name: 'Community',       desc: 'Refer a friend',                  earned: false },
  { id: 'linguist',      emoji: '🌍', name: 'Linguist',        desc: 'Complete all language modules',   earned: false },
];

function ProfilePage() {
  const { user, token } = useAuth();

  // ── Profile info state ──────────────────────────────────
  const [profile, setProfile] = useState({
    firstName:  user?.firstName  ?? '',
    lastName:   user?.lastName   ?? '',
    username:   user?.username   ?? '',
    email:      user?.email      ?? '',
  });
  const [profileMsg,  setProfileMsg]  = useState({ text: '', type: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // ── Password state ──────────────────────────────────────
  const [passwords, setPasswords] = useState({
    current: '', next: '', confirm: '',
  });
  const [passwordMsg,  setPasswordMsg]  = useState({ text: '', type: '' });
  const [savingPassword, setSavingPassword] = useState(false);

  const initials = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .map(s => s[0].toUpperCase())
    .join('') || (profile.email?.[0]?.toUpperCase() ?? '?');

  // ── Handlers ────────────────────────────────────────────
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    setSavingProfile(true);
    setProfileMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      setProfileMsg({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setProfileMsg({ text: err.message ?? 'Something went wrong', type: 'error' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async () => {
    if (passwords.next !== passwords.confirm) {
      setPasswordMsg({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    if (passwords.next.length < 8) {
      setPasswordMsg({ text: 'Password must be at least 8 characters', type: 'error' });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }),
      });
      if (!res.ok) throw new Error('Failed to update password');
      setPasswordMsg({ text: 'Password changed successfully!', type: 'success' });
      setPasswords({ current: '', next: '', confirm: '' });
    } catch (err) {
      setPasswordMsg({ text: err.message ?? 'Something went wrong', type: 'error' });
    } finally {
      setSavingPassword(false);
    }
  };

  const earnedCount = BADGES.filter(b => b.earned).length;

  return (
    <div className="profile-page">

      {/* ── Banner ──────────────────────────────────────── */}
      <div className="profile-banner" />

      {/* ── Sticky header with avatar ───────────────────── */}
      <div className="profile-header">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-circle">{initials}</div>
          <div className="profile-name-block">
            <h1>{[profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Your Name'}</h1>
            <span>@{profile.username || profile.email}</span>
          </div>
        </div>
      </div>

      <div className="profile-body">

        {/* ── Stats strip ───────────────────────────────── */}
        <div className="profile-card full-width">
          <div className="profile-stats-row">
            <div className="profile-stat">
              <span className="profile-stat-value">12</span>
              <span className="profile-stat-label">Quizzes taken</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">84%</span>
              <span className="profile-stat-label">Avg. score</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{earnedCount}</span>
              <span className="profile-stat-label">Badges earned</span>
            </div>
          </div>
        </div>

        {/* ── Edit Profile ──────────────────────────────── */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-icon blue">👤</div>
            <h2>Edit Profile</h2>
          </div>

          <div className="profile-field-row">
            <div className="profile-field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={profile.firstName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={profile.lastName}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          <div className="profile-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={profile.username}
              onChange={handleProfileChange}
              placeholder="e.g. fluent_jane"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>

          {profileMsg.text && (
            <p className={`profile-feedback ${profileMsg.type}`}>{profileMsg.text}</p>
          )}

          <button
            className="profile-save-btn"
            onClick={handleProfileSave}
            disabled={savingProfile}
          >
            {savingProfile ? 'Saving…' : 'Save Profile'}
          </button>
        </div>

        {/* ── Change Password ───────────────────────────── */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-icon green">🔒</div>
            <h2>Change Password</h2>
          </div>

          <div className="profile-field">
            <label htmlFor="current">Current password</label>
            <input
              id="current"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="next">New password</label>
            <input
              id="next"
              name="next"
              type="password"
              value={passwords.next}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>

          <div className="profile-field">
            <label htmlFor="confirm">Confirm new password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>

          {passwordMsg.text && (
            <p className={`profile-feedback ${passwordMsg.type}`}>{passwordMsg.text}</p>
          )}

          <button
            className="profile-save-btn secondary"
            onClick={handlePasswordSave}
            disabled={savingPassword || !passwords.current || !passwords.next}
          >
            {savingPassword ? 'Updating…' : 'Update Password'}
          </button>
        </div>

        {/* ── Badges ────────────────────────────────────── */}
        <div className="profile-card full-width">
          <div className="profile-card-header">
            <div className="profile-card-icon purple">🏅</div>
            <h2>Badges & Achievements</h2>
          </div>
          <div className="badges-grid">
            {BADGES.map(badge => (
              <div
                key={badge.id}
                className={`badge-item ${badge.earned ? 'earned' : 'locked'}`}
                title={badge.desc}
              >
                <span className="badge-emoji">{badge.emoji}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Danger Zone ───────────────────────────────── */}
        <div className="profile-card full-width">
          <div className="profile-card-header">
            <div className="profile-card-icon" style={{ background: '#FDECEA' }}>⚠️</div>
            <h2>Account</h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#5A7A8A' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="profile-danger-btn">Delete Account</button>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
