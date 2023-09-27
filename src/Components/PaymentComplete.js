import React from 'react';
import "./PaymentComplete.css"


const PaymentComplete = () => {
  return (
    <div className="paymentComplete">
      <h1 className="paymentMessage"> 
      Thank you for your purchase.
      <br></br>
       A confirmation email has been send to your registered email. 
      </h1>
    </div>
  )
}

export default PaymentComplete;
