import React, { useState } from 'react';

const ActionTagForm: React.FC = () => {
  const [tag, setTag] = useState('');
  const [player, setPlayer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating tag for:', player, tag);
    setTag('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        placeholder="Player name"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Action (e.g. Drive, Block)"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Tag
      </button>
    </form>
  );
};

export default ActionTagForm;