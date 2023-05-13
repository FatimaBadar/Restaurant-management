import React from "react";
import { ReservationContainer, Ufooter } from "../../components";
import Cart from "../Header";

function Reservation(){
    return(
        <>
            <Cart />
            <ReservationContainer />
            <Ufooter />
        </>

    );
}

export default Reservation;
