import React, { useState } from 'react'
import RestaurantFinder from "../Apis/RestaurantFinder";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [reviewText, setReviewText] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
        const respose = await RestaurantFinder.post(`/${id}/addreview`, {
            name, 
            rating, 
            review: reviewText
        })
    window.location.reload();
    } catch (error) {
        
    }
  }

  return (
    <div className='mb-2'>
        <form onSubmit={handleOnSubmit}>
            <div className='row'>
                <div className='form-group col-md-6'>
                    <label htmlFor='name' className='mb-2'>Name</label>
                    <input id="name" placeholder='Your name' type='text' className='form-control' value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className='form-group col-md-6'>
                    <label htmlFor='name' className='mb-2'>Rating</label>
                    <select className='form-select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className='form-group my-2'>
                <label htmlFor='review' className='mb-2'>Review</label>
                <textarea id='review' cols="100" rows="5" className='form-control' placeholder='You can be brutally honest here, No problemo.....' value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>
            </div>
            <div className='d-flex align-item-center justify-content-center my-3'>
                <button className='btn btn-outline-dark w-50'>Submit</button> 
            </div>
        </form>
    </div>
  )
}

export default AddReview
