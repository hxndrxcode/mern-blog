import React from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"

const PageHeader = ({ title, btnLink, btnText, btnArrow, children, btnLogout }) => {

    btnArrow = btnArrow || 'left'
    return (
        <React.Fragment>
            {btnLink ? (
                <Link to={btnLink} className="float-right">
                    {btnArrow === 'left' ? <Icon.ArrowLeft /> : ''}
                    {btnText}
                    {btnArrow === 'right' ? <Icon.ArrowRight /> : ''}
                </Link>
            ) : ''}
            {children}
            <h4 className="border-bottom pb-2 mb-4">
                {title} &nbsp;
            </h4>
        </React.Fragment>
    )
}

export default PageHeader