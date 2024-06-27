import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardSkeletion from "../Card/ExpenseCard";

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  marginTop: 8.5,
  padding: "20px",
};

const initialExpenseState = {
  expenseName: '',
  amount: '',
  paymentMode: '',
  groupId: '',
  comments: '',
  paidBy: '',
  date: ''
};

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState(initialExpenseState);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserExpenses = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/expenses/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const uId = sessionStorage.getItem('userId');
    if (uId) {
      setUserId(uId);
      fetchUserExpenses(uId);
    }
  }, []);

  useEffect(() => {
    const uId = sessionStorage.getItem('userId');
    if (uId) {
      setUserId(uId);
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/user/${uId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const user = await response.json();
          setUsername(user.username);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewExpense({ ...initialExpenseState, paidBy: userId });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const expenseWithUserAndDate = { ...newExpense, paidBy: userId, expenseDate: currentDate };
    const response = await fetch("http://localhost:8080/expense", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseWithUserAndDate),
    });
  
    if (response.ok) {
      const createdExpense = await response.json();
      setExpenses([...expenses, createdExpense]);
      handleClose();
      console.log(createdExpense);
    } else {
      console.error('Failed to create expense');
    }
  };

  return (
    <div>
      <h2>All Expenses</h2>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {expenses.map((expense) => (
          <Grid item key={expense.id}>
            <CardSkeletion expense={expense} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: '16px', right: '16px' }}
        onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h4 style={{ textAlign: "center" }}>Create New Expense</h4>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Expense Name"
              name="expenseName"
              value={newExpense.expenseName}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Amount"
              name="amount"
              value={newExpense.amount}
              onChange={handleChange}
              fullWidth
              margin="dense"
              type="number"
              size="small"
            />
            <TextField
              label="Payment Mode"
              name="paymentMode"
              value={newExpense.paymentMode}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Group ID"
              name="groupId"
              value={newExpense.groupId}
              onChange={handleChange}
              fullWidth
              margin="dense"
              type="number"
              size="small"
            />
            <TextField
              label="Comments"
              name="comments"
              value={newExpense.comments}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', gap: "20px" }}>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Expense
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AllExpenses;
