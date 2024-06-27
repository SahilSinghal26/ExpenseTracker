import React, { useState, useEffect } from 'react';
import "./CardSkeleton.css";

const CardSkeletion = ({expense,userId}) => {

    const [username, setUsername] = useState('');
    const [groupId, setGroupId] = useState('no group');

    
    useEffect(() => {
        const fetchUsername = async (userId) => {
          try {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch username');
            }
            const user = await response.json();
            setUsername(user.username);
            if(user.groupId != null){
                setGroupId(user.groupId);
            }
          } catch (error) {
            console.error('Error fetching username:', error);
          }
        };
    
        fetchUsername(expense.paidBy);
      }, [expense.paidBy]);


    return (
        <div className="et-card">
            <div className="et-card-header">{expense.expenseName}</div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Amount:</div>
                <div className="et-card-text col-6">{expense.amount}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Paid By:</div>
                <div className="et-card-text col-6">{username}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Payment Mode:</div>
                <div className="et-card-text col-6">{expense.paymentMode}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Group Id:</div>
                <div className="et-card-text col-6">{groupId}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Comment:</div>
                <div className="et-card-text col-6">{expense.comments}</div>
            </div>
            <div className="row et-card-row">
                <div className="et-card-label col-6">Expense Created on:</div>
                <div className="et-card-text col-6">{expense.expenseDate}</div>
            </div>
            
        </div>
    );
}

export default CardSkeletion;