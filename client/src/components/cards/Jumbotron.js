import React from "react"

const Jumbotron = ({title, subtitle}) => {
  return (
    <div className="container-fluid jumbotron">
        <div className="row">
            <div className="col text-center p-5">
                <h1 className="fw-bold">{title}</h1>
                <p className="lead"> {subtitle} </p>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron
