import React from "react";

import "./CardSkeleton.css";

const CardSkeletion = ({expense}) => {
    return (
        <div className="et-card">
            <div className="et-card-header">{expense.expenseName}</div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Amount:</div>
                <div className="et-card-text col-6">{expense.amount}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Payment Mode:</div>
                <div className="et-card-text col-6">{expense.paymentMode}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Comment:</div>
                <div className="et-card-text col-6">{expense.comments}</div>
            </div>
        </div>
    );
}

export default CardSkeletion;