import React from "react";
import { UMHeader, UserMenuContainer, Ufooter } from "../../components";
import Cart from "../Header";

function UserMenu(){
    return(
        <>
            <Cart />
            <UMHeader/>
			<UserMenuContainer/>
            <Ufooter />
        </>

    );
}

export default UserMenu;