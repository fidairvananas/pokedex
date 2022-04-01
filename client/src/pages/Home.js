import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
      .then(resp => {
        setPokemons(resp.data.results)
      })
      .catch(_=> setError(true))
      .finally(_=> setLoading(false))
  }, [])

  const navigate = useNavigate()
  const handleDetail = (id) => {
    navigate(`/detail/${id}`)
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
      <div>
        <div className="row m-3">
          {
            pokemons.map((el, index) => {
              return (
                <div key={index} className="col-sm-3 mb-2">
                  <div className="card">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{el.name.replace(/\w\S*/g, (txt)=>{ 
                        const newTxt = txt.slice(0,1).toUpperCase() + txt.substr(1);
                        return newTxt
                        })}</h5>
                      <button onClick={() => handleDetail(index+1)} className="btn btn-primary">See Detail</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
          
        </div>
      </div>
    </>
  )
}