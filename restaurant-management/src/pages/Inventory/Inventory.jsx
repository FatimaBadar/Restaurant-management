import React from "react";
import { InventoryContainer , Ufooter} from "../../components";
import Cart from "../Header";

function Inventory(){
    return(
        <>
            <Cart />
            <InventoryContainer />
            <Ufooter />
        </>

    );
}

export default Inventory;