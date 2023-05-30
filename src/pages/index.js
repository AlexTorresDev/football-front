import { useState } from 'react'
import { Inter } from 'next/font/google'
import { Select, Option, Button, Typography } from '@material-tailwind/react'
import { home_team, away_team, country as countries } from '../data/label_encoder_transformations.json'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [country, setCountry] = useState('');
  const [winner, setWinner] = useState(null);


  const handleClick = () => {
    if (homeTeam === '' || awayTeam === '' || country === '') {
      alert('Selecciona todos los campos');
      return;
    }

    if (homeTeam === awayTeam) {
      alert('Los equipos no pueden ser iguales');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        home_team: homeTeam,
        away_team: awayTeam,
        country: country,
      })
    }

    fetch('http://localhost:8000/match/', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if ((typeof (data.winner) === 'string') && data.winner.toLowerCase() === 'draw') {
          setWinner('Se predice que podría llegar a ser un empate');
        } else {
          setWinner(<span>Se predice que el ganador será: <strong>{data.winner}</strong></span>);
        }
      });
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Typography variant="h2">
        Proyecto final de <span className="font-bold text-green-500">Análisis de datos</span>
      </Typography>

      <div className="mb-52 relative flex-col gap-20 flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-green-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className="flex justify-center flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="w-72">
              <Select label="Selecciona equipo local" onChange={setHomeTeam}>
                {
                  Object.keys(home_team).sort().map((team) => (
                    <Option value={team} key={team}>
                      {team}
                    </Option>
                  ))
                }
              </Select>
            </div>

            <div className="w-72">
              <Select label="Selecciona equipo visitante" onChange={setAwayTeam}>
                {
                  Object.keys(away_team).sort().map((team) => (
                    <Option value={team} key={team}>
                      {team}
                    </Option>
                  ))
                }
              </Select>
            </div>

            <div className="w-72">
              <Select label="Selecciona país del partido" onChange={setCountry}>
                {
                  Object.keys(countries).sort().map((c) => (
                    <Option value={c} key={c}>
                      {c}
                    </Option>
                  ))
                }
              </Select>
            </div>
          </div>

          <Button color="green" onClick={handleClick}>Predecir ganador</Button>
        </div>

        {
          winner && <p>{winner}</p>
        }
      </div>
    </main>
  )
}
