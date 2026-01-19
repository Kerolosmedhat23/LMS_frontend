import React from "react";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
const Layout = ({ children }) => {
    return (
    <>
        <Header />
        {children}
        <Footer />
        </>

    )
}   
export default Layout