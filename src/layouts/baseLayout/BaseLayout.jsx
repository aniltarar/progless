import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

function BaseLayout() {
  useEffect(() => {
    if (! localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default BaseLayout