import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
  const{getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+50,
    }
    let responce = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (responce.data.success) {
      const{session_url} =responce.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error For Payment")
    }
  }


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' required onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input name='lastName' required onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input name='email' required onChange={onchangeHandler} value={data.email} type="text" placeholder='Email address'/>
        <input name='street' required onChange={onchangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input name='city' required onChange={onchangeHandler} value={data.city} type="text" placeholder='City'/>
          <input name='state' required onChange={onchangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' required onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input name='country' required onChange={onchangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input name='phone' required onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
            </div>
          </div>
            <button type='Submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder