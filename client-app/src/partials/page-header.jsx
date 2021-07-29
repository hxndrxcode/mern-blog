import React, { useContext } from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"
import { RootContext } from "../context/rootContext"

const PageHeader = ({ title, btnLink, btnText, btnArrow, children, btnLogout }) => {
    const { dispatch } = useContext(RootContext)
    const onLogout = e => {
        dispatch('set_logout')
    }

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
            {btnLogout ? (
                <span onClick={onLogout} className="float-right text-danger">
                    <Icon.LogOut />
                    Logout
                </span>
            ) : ''}
            <h4 className="border-bottom pb-2 mb-4">
                {title} &nbsp;
                {children}
            </h4>
        </React.Fragment>
    )
}

export default PageHeader