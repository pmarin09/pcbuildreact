import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

function FavoriteBuild({item}) {
 

    return (
            <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                            <strong className="d-inline-block mb-2 text-primary">PC Build App</strong>
                                <h3 className="mb-0">
                                    <a className="text-dark" href="#">{item.name}</a>
                                </h3>
                                    <div className="mb-1 text-muted">Gaming</div>
                                        <p className="card-text mb-auto">{item.description}</p>
                                        <Link to={`/builds/${item.id}`}><button type="button" className="btn btn-sm btn-outline-secondary">View full Specs</button></Link>
                        </div>
                                        {/* <i 
                                        className={iconClassName}
                                        onClick= {() => removeFromFavorites(item.id)}
                                        ref={ref}
                                        ></i> */}
                                    <img src={`http://localhost:3000/${item.attachment_url}`} width="500px" />
                    </div>
            </div>
            
    )
}

FavoriteBuild.propTypes = {
    item: PropTypes.shape({
        attachment_url: PropTypes.string.isRequired
    })
}

export default FavoriteBuild