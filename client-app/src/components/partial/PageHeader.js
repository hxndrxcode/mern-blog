import React from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"

const PageHeader = ({ title, btnLink, btnText, btnArrow }) => {
    return (
        <React.Fragment>
            {btnLink ? (
                <Link to={btnLink} className="float-right">
                    {btnArrow === 'left' ? <Icon.ArrowLeft /> : ''}
                    {btnText}
                    {btnArrow === 'right' ? <Icon.ArrowRight /> : ''}
                </Link>
            ) : ''}
            <h4 className="border-bottom pb-2 mb-4">
                {title}
            </h4>
        </React.Fragment>
    )
}

export default PageHeader