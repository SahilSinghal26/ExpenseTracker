import React from "react";
import { useNavigate } from "react-router-dom";

import "./CardSkeleton.css";

const CardSkeletion = ({group}) => {
    const navigate = useNavigate();
    const openGroupInfo = (groupId) => {
        console.log("Open Group: " + groupId)
        navigate(`/groups/${groupId}`);
    }

    return (
        <div className="et-card et-info-link" onClick={() => openGroupInfo(group.id)}>
            <div className="et-card-header">{group.name}</div>
            <div className="et-card-footer">
                <div className="et-card-label col-6">Created By:</div>
                <div className="et-card-text col-6">{group.admmin}</div>
            </div>
        </div>
    );
}

export default CardSkeletion;