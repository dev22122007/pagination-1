import { CarTypes } from "../../types"
import { FC } from "react"

interface dataType {
    data: CarTypes
}

const Car: FC<dataType> = ({ data }) => {
    return (
        <div className="card mt-2" style={{ width: "18rem", height: "20rem" }}>
            <img src={data.image} height={150} className="card-img-top" alt="image" />
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.class}</p>
                <a href="#" className="btn btn-primary">{data.start_production}</a>
            </div>
        </div>
    )
}

export default Car