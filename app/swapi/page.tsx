'use client'

import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'

const SWAPI_QUERY = gql`
  query Query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`

// Create a function that makes the GraphQL request
async function fetchLaunches() {
  const data = await request(
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    SWAPI_QUERY
  )
  return data
}

export default function SpaceXPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['SWAPI'],
    queryFn: fetchLaunches,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading SpaceX data</div>

  return (
    <div>
      <h1 className="text-blue-500 font-bold text-center p-5 text-xl">SWAPI</h1>
      <ul className="flex flex-wrap justify-center">
        {data?.allFilms?.films?.map((film: any) => (
          <li className="m-5 bg-slate-400 " key={film.title}>
            <h2>{film.title}</h2>
            <p>Directed by {film.director}</p>
            <p>Released on {film.releaseDate}</p>
            <ul>
              {film.speciesConnection.species.map((species: any) => (
                <li key={species.name}>
                  <h3>{species.name}</h3>
                  <p>{species.classification}</p>
                  <p>Homeworld: {species?.homeworld?.name}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
