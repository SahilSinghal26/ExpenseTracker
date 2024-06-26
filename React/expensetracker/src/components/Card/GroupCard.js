import React from "react";

import "./CardSkeleton.css";

const CardSkeletion = ({group}) => {
    return (
        <div className="et-card et-info-link">
            <div className="et-card-header">{group.name}</div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Created By:</div>
                <div className="et-card-text col-6">{group.admmin}</div>
            </div>
        </div>
    );
}

export default CardSkeletion;