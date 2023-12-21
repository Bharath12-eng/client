import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export const Paginations = ({handlenext, handleprevious, page, pageCount, setpage}) => {
  return (
   
    <>
    {
      pageCount > 0 ? <div className='pagination_div d-flex justify-content-end mx-5'>
      <Pagination>
      
        <Pagination.Prev onClick={()=>handleprevious()} />
        {
          Array(pageCount).fill(null).map((element,index)=>{
            return(
              <>
            <Pagination.Item key={index} active={page == index + 1 ? true : false} onClick={() => setpage(index + 1)}>{index + 1}</Pagination.Item>
            </>
            )
          })
        }
        
        <Pagination.Next onClick={()=>handlenext()}/>
       
      </Pagination>
    </div> 
    : ""
    }
      
    </>
  )
}
