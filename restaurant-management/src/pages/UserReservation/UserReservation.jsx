import React from "react";
import { UserReservationContainer, Ufooter } from "../../components";
import Cart from "../Header";

function UserReservation(){
    return(
        <>
            <Cart />
            <UserReservationContainer />
            <Ufooter />
        </>

    );
}

export default UserReservation;