import React from "react";

import "./CardSkeleton.css";

const CardSkeletion = ({expense}) => {
    return (
        <div className="et-card">
            <div className="et-card-header">Grocery</div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Amount:</div>
                <div className="et-card-text col-6">{expense.amount}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Payment Mode:</div>
                <div className="et-card-text col-6">Cash</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Comment:</div>
                <div className="et-card-text col-6">This is a test multi-line comment</div>
            </div>
        </div>
    );
}

export default CardSkeletion;