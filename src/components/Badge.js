import { MDBBadge } from 'mdb-react-ui-kit';
import React from 'react';

const Badge = ({children,className}) => {
    const colorPick ={
        Laptop : "info",
        Mobile: "warning"
    }
    return(
        <h5 className={className}>
            <MDBBadge color={colorPick[children]}>
                {children}
            </MDBBadge>
        </h5>
    )
}

export default Badge;