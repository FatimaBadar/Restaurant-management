import React from "react";
import { EmployeeContainer, Ufooter } from "../../components";
import Cart from "../Header";


function Employee(){
    return(
        <>
            <Cart />
            <EmployeeContainer />
            <Ufooter />
        </>

    );
}

export default Employee;