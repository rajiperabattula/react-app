import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import React from 'react';
import '../scss/home.scss';

const Category = ({handleCategory, options}) => {
    console.log("options",options);
    return (
        <MDBCard className='category-block'>
            <h4>Categories</h4>
            <MDBListGroup flush>
                {options.map((item,index)=>{
                    return <MDBListGroupItem key={index} className='category-list' onClick={()=>handleCategory(item)}>
                        {item}
                    </MDBListGroupItem>
                })}
            </MDBListGroup>
        </MDBCard>
    )
}

export default Category;