import React, {useEffect, useState} from "react";
import P from "../Api"
import {Badge} from "../views/Home";
import {useHistory} from "react-router-dom";


const Detail = (props) => {
    const [data, setData] = useState(null)
    const history = useHistory();

    const fetchDetail = async () => {
        return await P.getPokemonByName(+props.match.params.id)
    }

    const handleClick = (i) => {
        history.push(`/${i}`)
    }

    useEffect(() => {
        fetchDetail()
            .then(resp => {
                const img = "https://www.clipartmax.com/png/middle/129-1298368_ref-pokeball-transparent-background.png"
                const stats = []
                for(const data of resp["stats"]){
                    stats.push({
                        name: data["stat"]["name"],
                        base_stat: data["base_stat"],
                        effort: data["effort"]
                    })
                }
                setData(
                    {
                        name: resp["name"],
                        height: resp["height"],
                        weight: resp["weight"],
                        stats: stats,
                        abilities: resp["abilities"].map(v => v["ability"]["name"]),
                        pic: resp["sprites"]["front_default"] ? resp["sprites"]["front_default"] : img,
                        types: resp["types"].map(arrType => arrType["type"]["name"])
                    }
                )
            })
            .catch(() => setData('error'))
        // eslint-disable-next-line
    }, [])
    if(data === "error"){
        return (
            <>
                <div className="center-t">
                    something error
                </div>
            </>
        )
    } else if(!data) {
        return (
            <>
                <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="">
                    <div className="container">
                        <button type="button" className="btn btn-warning mt-5 ml-3" onClick={history.goBack}>Back</button>
                    </div>
                    <div className="d-flex my-5 justify-content-center mx-auto">
                        <div className="d-flex flex-column w-100">
                            <div className="p-2 mx-auto ">
                                <h2 style={{fontWeight: "700"}}> {data["name"]}</h2>
                            </div>
                            <div className="p-2 mx-auto">
                                <img src={data["pic"]} alt="" className="" width="300"/>
                            </div>
                            <div className="p-2 container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="table-responsive-sm">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Stat</th>
                                                    <th scope="col">Base Stat</th>
                                                    <th scope="col">Effort</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {data.stats.map((value, index) => {
                                                    return(
                                                        <tr key={index}>
                                                            <td> { value.name }</td>
                                                            <td> { value.base_stat } xp </td>
                                                            <td> { value.effort }</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row mx-auto text-center">
                                            <div className="col-2">
                                                <b> Height </b>
                                            </div>
                                            <div className="col-4">
                                                {data.height} cm
                                            </div>
                                            <div className="col-2">
                                                <b> Weight </b>
                                            </div>
                                            <div className="col-4">
                                                {data.weight} kg
                                            </div>
                                            <div className="col-12">
                                                {data.types.map((value, index) => {
                                                    return(
                                                        <div className="my-2 p-2" key={index}>
                                                            <Badge
                                                                name={value}
                                                                src={`/images/${value}.png`}
                                                                color={'rgba(254, 207, 45, 0.9)'}
                                                                click={handleClick}
                                                                route={`all/${value}`}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="pl-2 text-left">
                                               <div className="col-1">
                                                   <b> Abilities </b>
                                               </div>
                                                <div className="pl-2 row mx-auto">
                                                    {data.abilities.map((value, index) => {
                                                        return (
                                                            <span key={index} className="badge badge-pill badge-light">{value}</span>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Detail
