import React from 'react';
import '../scss/home.scss';
import { 
    MDBCol, 
    MDBCard, 
    MDBCardTitle, 
    MDBCardBody, 
    MDBCardImage, 
    MDBCardText} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';
import Badge from './Badge';

function Blogs({id,categoryId,description,model,name,price,excerpt}){
    return(
        <MDBCol size='4'>
            <MDBCard className='h-80 mt-2 mb-4 card-container'>
                <MDBCardImage 
                className='blog-card'
                src={`../images/blog${id}.jpg`}
                alt={name}
                position='top'
                />
                <MDBCardBody>
                    <MDBCardTitle>{name}</MDBCardTitle>
                    <MDBCardText>{excerpt(description)}
                    <Link to={`/blog/${id}`}>Read More</Link>
                    </MDBCardText>
                    <Badge model={model} price={price} className="">{categoryId == 0 ? "Laptop" : "Mobile"}</Badge>
                    <p className='mt-1'>
                    <span className='cardBottom-content'>{model}  | Rs. {price}</span>
                    </p>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Blogs;