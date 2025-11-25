import React, { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saved, setSaved] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = { id: Date.now(), name, email, role, avatar };
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    localStorage.setItem('currentProfile', JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Create Employee Profile
      </h1>

      {/* Card container for mobile-friendly UI */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow max-w-lg"
      >
        {/* Avatar upload + preview centered for mobile */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Image</span>
            )}
          </div>

          <label className="text-sm text-gray-700 dark:text-gray-300 mt-3">
            Upload Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="mt-1 text-sm text-gray-700 dark:text-gray-300"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Profile
          </button>

          {saved && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Saved to localStorage
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
