import React from 'react'
// import { Link } from 'react-router-dom'
// import * as Icon from "react-feather"

const BulkAction = props => {
    return (
        <React.Fragment>
            <div>
                <label htmlFor={'id_all'} className="btn btn-sm btn-light mb-0 mr-2">
                    <input type="checkbox" id={'id_all'} /> Select all
                </label>
                <div className="dropdown d-inline-block">
                    <button className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                        Bulk Action
                    </button>
                    <div className="dropdown-menu">
                        {props.action.map(v => {
                            return (
                                <span onClick={v.callback}
                                    className={'dropdown-item'}
                                    key={v.text}>
                                    {v.text}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BulkAction