import React,{useState,useEffect} from 'react';
import '../scss/blog.scss';
import { toast } from 'react-toastify';
import {
    MDBIcon,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardText,
    MDBCardTitle,
    MDBCardBody,
    MDBCardImage,
    MDBTypography
} from 'mdb-react-ui-kit';
import {Link, useParams} from 'react-router-dom';
import Badge from '../components/Badge';
import axios from 'axios';
import Blogs from '../components/Blogs';

function Blog(){
    const [blog,setBlog]=useState();
    const [relatedBlog,setRelatedBlog]=useState([]);
    const {id} = useParams();
    const d = new Date();

    useEffect(()=>{
        if(id){
            getSingleBlog();
        }
    },[])

    const getSingleBlog = async () => {
        const response = await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products/${id}`);

            if(response.status === 200){
                setBlog(response.data);
            } 
            else{
                toast.error("Something went wrong!");
            }  
        const getRelatedBlogsData = await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products?categoryId=${response.data.categoryId}&_start=0&_end=4`);
            if(getRelatedBlogsData.status === 200){
                setRelatedBlog(getRelatedBlogsData.data);
            } 
            else{
                toast.error("Something went wrong!");
            }
    }
    
    useEffect(()=>{
        setRelatedBlog(relatedBlog);
    },[relatedBlog])

    console.log("relatedBlog",relatedBlog)

    const excerpt = (str) => {
        if(str.length>100){
            str = str.substring(0,50) + " ... ";
        }
        return str;
}
    return(
        blog ? 
        <>
        <MDBContainer className='blog-page'>
            <Link to='/'>
                <strong className='mt-3 go-back'>Go Back</strong>
            </Link>
            <MDBTypography tag='h2' className='text-muted mt-2 blog-page-title'>
                {blog && blog.name}
            </MDBTypography> 
            <img src={blog && `../images/blog${id}.jpg`} className='image-fluid rounded blog-page-image' alt={blog.name}/>
            <div className='blog-page-container'>
                <div className='blog-page-container-block'>
                    <MDBIcon 
                    className='blog-page-container-icon mt-3'
                    far
                    icon='calendar-alt'
                    size='lg'
                    />
                    <strong className='date'>
                        {d.getDate()}-{d.getMonth()+1}-{d.getFullYear()}
                    </strong>
                    <span className='badge-details'>
                    <p>
                    <span className='cardBottom-content'>{blog.model}  | Rs. {blog.price}</span>
                    </p>
                    <Badge model={blog.model} price={blog.price}>{blog.categoryId === 0 ? "Laptop" : "Mobile"}</Badge>
                    </span>
                </div>
                <MDBTypography className='lead md-0 blog-page-description'>
                    {blog && blog.description}
                </MDBTypography>
            </div>
            {relatedBlog && relatedBlog.length > 0 && (
                <>
                {relatedBlog.length >1 && (<h1 className='related-blogs mt-5'>Related Blogs</h1>)}
                
                    <div className='mt-5 g-4 d-flex related-blogs-container flex-wrap justify-content-center'>
                    {relatedBlog
                    .filter((item)=> item.id!=id)
                    .map((item,index)=>{
                            return <MDBCol className='mt-2 mb-4 card-container'>
                            <MDBCard className='h-80'>
                                <MDBCardImage 
                                className='blog-card'
                                src={`../images/blog${item.id}.jpg`}
                                alt={item.name}
                                position='top'
                                />
                                <MDBCardBody>
                                    <MDBCardTitle>{item.name}</MDBCardTitle>
                                    <MDBCardText>{excerpt(item.description)}
                                    <Link to={`/blog/${item.id}`}>Read More</Link>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    })}
                    </div>
                </>
            )}
        </MDBContainer>
        </> 
        :
        <h2 className='loading'>Loading...</h2>
    )
}

export default Blog;