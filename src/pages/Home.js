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
    const [pageLimit]=useState(6);


    const options = ["Laptops","Mobiles"];
    useEffect(()=>{
        loadBlogsData(0, 6, 0);
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
        <div className="loading">
            <img src="../images/load.gif"/>
            <h4>Loading...</h4>
        </div>
         :
            <>
            <MDBCol>
                {data.length === 0 && (
                    <MDBTypography className='text-center mb-0' tag='h2'>
                        No Blogs Found
                    </MDBTypography>
                )}
                <div className='blog-banner'>
                    <div className='mt-5 banner-content'>
                        <h2 className='blog-head'> Blogs</h2>
                        <span className='blog_subHead'>Every time you post something online, you have a choice. You can either make it something that adds to the happiness levels in the world—or you can make it something that takes away</span>
                    </div>
                </div>
                <MDBRow className='blogs-container'>
                <MDBCol className='mt-4'>
                    <div className='d-flex flex-wrap g-4'>
                        <div className='each-card d-flex flex-wrap'>
                            {data.map((item,index) => (
                                <Blogs 
                                key={index}
                                {...item}
                                excerpt={excerpt}
                                />)
                            )}
                        </div>
                    </div>
                </MDBCol>
                <MDBCol size='3' className='mt-5 category-container'>
                <Category 
                options={options}
                handleCategory={handleCategory}
                />
                </MDBCol>
                </MDBRow>
            </MDBCol>
            <div className='mt-3 mb-5'>
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