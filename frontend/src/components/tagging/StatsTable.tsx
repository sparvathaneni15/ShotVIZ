import React, { useState, useEffect } from 'react';

interface StatsTableProps {
  practiceSessionId: number;
}

const StatsTable: React.FC<StatsTableProps> = ({ practiceSessionId }) => {
  const [players, setPlayers] = useState<{ id: number; name: string; points: number; assists: number; rebounds: number; steals: number; blocks: number; turnovers: number; fouls: number; }[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/all`);
        const data = await response.json();
        const initializedPlayers = data.map((player: { id: number; first_name: string; last_name: string; jersey_no: number }) => ({
          id: player.id,
          name: `${player.first_name} ${player.last_name} #${player.jersey_no}`,
          points: 0,
          assists: 0,
          rebounds: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0,
        }));
        setPlayers(initializedPlayers);
      } catch (error) {
        console.error("Failed to fetch players", error);
      }
    };
    fetchPlayers();
  }, []);

  const handleInputChange = async (index: number, field: string, value: number) => {
    const updated = [...players];
    (updated[index] as any)[field] = value;
    setPlayers(updated);

    const player = updated[index];
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/stats/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practice_session_id: practiceSessionId,
          player_id: player.id,
          points: player.points,
          assists: player.assists,
          rebounds: player.rebounds,
          steals: player.steals,
          blocks: player.blocks,
          turnovers: player.turnovers,
          fouls: player.fouls
        }),
      });
    } catch (err) {
      console.error("Failed to update stat", err);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-300 rounded-xl p-4 shadow-md">
      <table className="min-w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 rounded-l-lg">Player</th>
            <th className="p-3">Points</th>
            <th className="p-3">Assists</th>
            <th className="p-3">Rebounds</th>
            <th className="p-3">Steals</th>
            <th className="p-3">Blocks</th>
            <th className="p-3">Turnovers</th>
            <th className="p-3 rounded-r-lg">Fouls</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => (
            <tr key={idx} className="bg-gray-900 text-center hover:bg-gray-700 transition-all">
              <td className="p-3 rounded-l-lg">{p.name}</td>
              {['points', 'assists', 'rebounds', 'steals', 'blocks', 'turnovers', 'fouls'].map((field) => (
                <td key={field} className={`p-3`}>
                  <input
                    type="number"
                    value={(p as any)[field]}
                    onChange={(e) => handleInputChange(idx, field, parseInt(e.target.value) || 0)}
                    className="w-16 bg-gray-700 text-white rounded px-2 py-1 text-center"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;