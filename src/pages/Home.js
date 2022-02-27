import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MDBRow, MDBCol, MDBContainer, MDBTypography} from 'mdb-react-ui-kit';
import Blogs from '../components/Blogs';
import Category from '../components/Category';
import Pagination from '../components/Pagination';
import '../scss/home.scss';

function Home(){
    const [data,setData]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [totalBlog,setTotalBlog]=useState(null);
    const [pageLimit]=useState(5);


    const options = ["Laptops","Mobiles"];
    useEffect(()=>{
        loadBlogsData(0, 5, 0);
    },[]);

const loadBlogsData = async (start, end, increase) => {
    const response = await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products?_start=${start}&_end=${end}`);
        if(response.status === 200){
            setData(response.data);
            setCurrentPage(currentPage + increase);
            setTotalBlog(response.data.length)
        } 
        else{
            toast.error("Something went wrong!");
        }
}
console.log(data)

const excerpt = (str) => {
        if(str.length>40){
            str = str.substring(0,50) + " ... ";
        }
        return str;
}

const handleCategory = async (category) => {
    let categoryID = category==="Laptops" ? 'categoryId=0' : 'categoryId=1' ;
    const response = await axios.get(`https://aveosoft-react-assignment.herokuapp.com/products?${categoryID}`);
    if(response.status === 200){
        setData(response.data)
    } 
    else{
        toast.error("Something went wrong!");
    }
};
    return(
        data.length === 0 ? 
        <h2 className='loading'>Loading...</h2>
         :
            <>
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className='text-center mb-0' tag='h2'>
                        No Blogs Found
                    </MDBTypography>
                )}
                <MDBContainer className='blog-banner'>
                    <div className='blog-bg'>
                    <img src='../images/Blog.jpg'/>
                    </div>
                    <div className='mt-5 banner-content'>
                        <h2 className='blog-head'> Blogs</h2>
                        <span className='blog_subHead'>Every time you post something online, you have a choice. You can either make it something that adds to the happiness levels in the world—or you can make it something that takes away</span>
                    </div>
                </MDBContainer>
                <MDBCol className='mt-4'>
                    <MDBContainer>
                        <MDBRow>
                            {data.map((item,index) => (
                                <Blogs 
                                key={index}
                                {...item}
                                excerpt={excerpt}
                                />)
                            )}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol size='3' className='mt-5'>
                <Category 
                options={options}
                handleCategory={handleCategory}
                />
                </MDBCol>
            </MDBRow>
            <div className='mt-3'>
                <Pagination
                currentPage={currentPage}
                loadBlogsData={loadBlogsData}
                pageLimit={pageLimit}
                data={data}
                totalBlog={totalBlog}
                />
            </div>
            </>
    )
}

export default Home;