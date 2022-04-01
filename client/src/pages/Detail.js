import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Detail() {
  const [detailPokemon, setDetailPokemon] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemonSpecies, setPokemonSpecies] = useState({})

  const [showAbout, setShowAbout] = useState(true)
  const [showBaseState, setShowBaseState] = useState(false)
  const [showEvolution, setShowEvolution] = useState(false)
  const [showMoves, setShowMoves] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resp => {
      setDetailPokemon(resp.data)
    })
    .catch(_=> {
      setError(true)
    })
    .finally(_=> {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then(resp => {
        setPokemonSpecies(resp.data)
      })
      .catch(_=> {
        setError(true)
      })
      .finally(_=> {
        setLoading(false)
      })
  }, [])

  const handleAbout = () => {
    setShowAbout(true)
    setShowBaseState(false)
    setShowEvolution(false)
    setShowMoves(false)
  }

  const handleBaseState = () => {
    setShowAbout(false)
    setShowBaseState(true)
    setShowEvolution(false)
    setShowMoves(false)
  }

  const handleEvolution = () => {
    setShowAbout(false)
    setShowBaseState(false)
    setShowEvolution(true)
    setShowMoves(false)
  }

  const handleMoves = () => {
    setShowAbout(false)
    setShowBaseState(false)
    setShowEvolution(false)
    setShowMoves(true)
  }

  if (error) {
    return (
      <div>
        <h1>Internal server error</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <>
    <div className="my-3 d-flex justify-content-center">
      <div className="card w-50">
        <div className="position-relative">
          <div className="namePokemon position-absolute top-0 start-0 m-5">
            <h3 className="d-flex justify-content-start text-dark w-auto">
              {
                detailPokemon ? detailPokemon.name.replace(/\w\S*/g, (txt)=>{ 
                 return txt.slice(0,1).toUpperCase() + txt.substr(1);
                }): detailPokemon
              }
            </h3>
            <div className="d-flex flex-row w-auto">
              <h4 className="bg-light pb-2 rounded-pill text-dark px-3">{detailPokemon.types[0].type.name}</h4>
              <h4 className="bg-light pb-2 rounded-pill text-dark mx-3 px-3">{detailPokemon.types[1].type.name}</h4>
            </div>
          </div>
          <div className="idPokemon position-absolute top-0 end-0 m-5">
            <h3 className="text-dark">#{id}</h3>
          </div>
        </div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="d-flex justify-content-end card-img-top" alt="..." />
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item d-flex justify-content-between">
              <button onClick={handleAbout} className={showAbout === true ? "nav-link active" : "nav-link"} aria-current={showAbout}>About</button>
            </li>
            <li className="nav-item">
              <button onClick={handleBaseState} className={showBaseState === true ? "nav-link active" : "nav-link"} >Base State</button>
            </li>
            <li className="nav-item">
              <button onClick={handleEvolution} className={showEvolution === true ? "nav-link active" : "nav-link"}>Evolution</button>
            </li>
            <li className="nav-item">
              <button onClick={handleMoves} className={showMoves === true ? "nav-link active" : "nav-link"}>Moves</button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {
            showAbout === true ?
            <div className="w-100">
              <div className="d-flex flex-row my-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Species</h5>
                <h5 className="d-flex align-items-start text-black">{detailPokemon.species.name}</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Height</h5>
                <h5 className="d-flex align-items-start text-black">{detailPokemon.height} cm</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Weight</h5>
                <h5 className="d-flex align-items-start text-black">{detailPokemon.weight} kg</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Abilities</h5>
                {
                  detailPokemon.abilities.map((el, index) => {
                    let ability = el.ability.name
                    return (
                      <h5 key={index} className="d-flex align-items-start text-black">{ability}</h5>
                    )
                  })
                }
              </div>
            </div>
            : showBaseState === true ?
            <div className="w-100">
              {
                detailPokemon.stats.map((el, index) => {
                  return (
                      <div key={index} className="d-flex flex-row my-3 w-75">
                        <h5 className="d-flex align-items-start w-100 text-muted">
                          {
                            el.stat.name.replace(/\w\S*/g, (txt)=>{ 
                            return txt.slice(0,1).toUpperCase() + txt.substr(1);
                            })
                          }
                        </h5>
                        <h5 className="d-flex align-items-start w-50 text-black">{el.base_stat}</h5>
                      </div>
                  )
                })
              }
            </div>
            : showEvolution === true ?
            <div className="w-100">
              <div className="d-flex flex-row my-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Name</h5>
                <h5 className="d-flex align-items-start text-black">{pokemonSpecies.name}</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Habitat</h5>
                <h5 className="d-flex align-items-start text-black">{pokemonSpecies.habitat.name}</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Is Baby</h5>
                <h5 className="d-flex align-items-start text-black">{`${pokemonSpecies.is_baby}`}</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Is Legendary</h5>
                <h5 className="d-flex align-items-start text-black">{`${pokemonSpecies.is_legendary}`}</h5>
              </div>
              <div className="d-flex flex-row mb-3 w-75">
                <h5 className="d-flex align-items-start w-50 text-muted">Is Mythical</h5>
                <h5 className="d-flex align-items-start text-black">{`${pokemonSpecies.is_mythical}`}</h5>
              </div>
            </div>
            : 
            <div className="w-100">
              {
                detailPokemon.moves.slice(0, 5).map((el, index) => {
                  return (
                    <div key={index} className="d-flex flex-row my-3 w-75">
                      <h5 className="d-flex align-items-start w-50 text-muted">
                        {
                          el.move.name.replace(/\w\S*/g, (txt)=>{ 
                            return txt.slice(0,1).toUpperCase() + txt.substr(1);
                            })
                        }
                      </h5>
                      <h5 className="d-flex align-items-start text-black">{el.version_group_details[0].move_learn_method.name}</h5>
                    </div>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
    </>
  )
}