import React, { useState, useEffect } from 'react';

interface PlayerStats {
  id: number;
  name: string;
  jersey_no: number;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
}

interface StatsTableProps {
  practiceSessionId: number;
}

const StatsTable: React.FC<StatsTableProps> = ({ practiceSessionId }) => {
  const [players, setPlayers] = useState<PlayerStats[]>([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        // 1) Fetch all players
        const playersRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/players/`);
        const playersData: Array<{ id: number; first_name: string; last_name: string; jersey_no: number }> = await playersRes.json();

        // 2) Initialize each player with default zeros
        const initialStats: PlayerStats[] = playersData.map(player => ({
          id: player.id,
          name: `${player.first_name} ${player.last_name}`,
          jersey_no: player.jersey_no,
          points: 0,
          assists: 0,
          rebounds: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          fouls: 0,
        }));

        // 3) For each player, fetch their stats if they exist
        const withStats = await Promise.all(initialStats.map(async p => {
          try {
            const statRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stats/${practiceSessionId}/${p.id}`);
            if (!statRes.ok) return p; // no stats recorded
            const statData: { id: number; points: number; assists: number; rebounds: number; steals: number; blocks: number; turnovers: number; fouls: number } = await statRes.json();
            return {
              ...p,
              stat_id: statData.id,
              points: statData.points,
              assists: statData.assists,
              rebounds: statData.rebounds,
              steals: statData.steals,
              blocks: statData.blocks,
              turnovers: statData.turnovers,
              fouls: statData.fouls,
            };
          } catch {
            return p;
          }
        }));
        setPlayers(withStats);
      } catch (error) {
        console.error("Failed to fetch players", error);
      }
    };
    fetchPlayerStats();
  }, []);

  const handleInputChange = async (index: number, field: keyof Omit<PlayerStats, 'id' | 'name' | 'jersey_no'>, value: number) => {
    const sanitized = Math.max(0, value);
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: sanitized };
    setPlayers(updated);

    const player = updated[index];
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/stats/${practiceSessionId}/${player.id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          practice_session_id: practiceSessionId,
          player_id: player.id,
          points: player.points,
          assists: player.assists,
          rebounds: player.rebounds,
          steals: player.steals,
          blocks: player.blocks,
          turnovers: player.turnovers,
          fouls: player.fouls,
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
              <td className="p-3 rounded-l-lg">{p.name} #{p.jersey_no}</td>
              {['points', 'assists', 'rebounds', 'steals', 'blocks', 'turnovers', 'fouls'].map((field) => (
                <td key={field} className={`p-3`}>
                  <input
                    type="number"
                    min={0}
                    value={p[field as keyof Omit<PlayerStats, 'id' | 'name' | 'jersey_no'>]}
                    onChange={(e) => handleInputChange(idx, field as keyof Omit<PlayerStats, 'id' | 'name' | 'jersey_no'>, parseInt(e.target.value) || 0)}
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