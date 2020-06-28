import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({name, types, source, c, id}) => {
    const history = useHistory()

    const goToDetail = () => {
        history.push("/detail/"+id)
    }
    return (
        <>
            <div className="d-flex flex-row justify-content-between box shadow p-3 mb-1 ro" onClick={goToDetail}>
                <div className="my-auto">
                    <img src={source} alt={`${name}#${c} pic`} width="128" />
                </div>
                <div className="d-flex py-1 px-2 flex-column justify-content-center">
                    <div className="item-box">
                        {name}
                    </div>
                    <div className="d-flex flex-row">
                        {types.map((v, index)=> {
                           return <img src={`/images/${v}.png`} width="20" key={index} alt={v}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
