import React from 'react';
import './latestBlog.css';
import { Link } from 'react-router-dom'

const LatestBlog = ({imageUrl, title, id}) => {
  return (
    <div className='LatestBlog'>
        <Link to={`/blog/${id}`} className="latest_blog">
        <img src={imageUrl} alt={title} />
         <div className='latest_title'>
             <h6>{title}</h6>
         </div>
        </Link>
    </div>
  )
}

export default LatestBlog