// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const style = {
//   position: 'absolute',
//   top: '45%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 450,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   marginTop: 8.5,
// };

// const initialExpenseState = {
//   expenseName: '',
//   amount: '',
//   paidBy: '',
//   paymentMode: '',
//   groupId: '',
//   comments: ''
// };

// const AllExpenses = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newExpense, setNewExpense] = useState(initialExpenseState);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/expense'); // Replace with your actual endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch expenses');
//         }
//         const data = await response.json();
//         setExpenses(data);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const handleOpen = () => setOpen(true);

//   const handleClose = () => {
//     setOpen(false);
//     setNewExpense(initialExpenseState); // Reset the form fields when modal closes
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewExpense({
//       ...newExpense,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:8080/expense', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newExpense),
//     });

//     if (response.ok) {
//       const createdExpense = await response.json();
//       setExpenses([...expenses, createdExpense]);
//       handleClose();
//     } else {
//       console.error('Failed to create expense');
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ marginBottom: "30px" }}>All Expenses</h2>
//       <Grid container style={{ marginLeft: "10px", border: "2px solid green" }}>
//         {expenses.map(expense => (
//           <Grid item xs={4} key={expense.id}>
//             <Card variant="outlined" style={{ height: "200px", width: "300px", border: "2px solid red" }}>
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   {expense.expenseName}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Amount: {expense.amount}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Paid By: {expense.paidBy}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Payment Mode: {expense.paymentMode}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Group ID: {expense.groupId}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   Comments: {expense.comments}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Fab
//         color="secondary"
//         aria-label="add"
//         style={{ position: 'fixed', bottom: '16px', right: '16px' }}
//         onClick={handleOpen}>
//         <AddIcon />
//       </Fab>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={style}>
//           <h4 style={{ textAlign: "center" }}>Create New Expense</h4>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Expense Name"
//               name="expenseName"
//               value={newExpense.expenseName}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               size="small"
//             />
//             <TextField
//               label="Amount"
//               name="amount"
//               value={newExpense.amount}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               type="number"
//               size="small"
//             />
//             <TextField
//               label="Paid By"
//               name="paidBy"
//               value={newExpense.paidBy}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               type="number"
//               size="small"
//             />
//             <TextField
//               label="Payment Mode"
//               name="paymentMode"
//               value={newExpense.paymentMode}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               size="small"
//             />
//             <TextField
//               label="Group ID"
//               name="groupId"
//               value={newExpense.groupId}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               type="number"
//               size="small"
//             />
//             <TextField
//               label="Comments"
//               name="comments"
//               value={newExpense.comments}
//               onChange={handleChange}
//               fullWidth
//               margin="dense"
//               size="small"
//             />
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', gap: "20px" }}>
//               <Button variant="outlined" color="primary" onClick={handleClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained" color="secondary">
//                 Add Expense
//               </Button>
//             </div>
//           </form>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default AllExpenses;




import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  marginTop: 8.5,
};

const initialExpenseState = {
  expenseName: '',
  amount: '',
  paymentMode: '',
  groupId: '',
  comments: ''
};

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState(initialExpenseState);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8080/expense'); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    // Retrieve the logged-in user's ID from session storage
    const userId = sessionStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewExpense(initialExpenseState); // Reset the form fields when modal closes
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
    const expenseWithUser = { ...newExpense, paidBy: userId };
    const response = await fetch('http://localhost:8080/expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseWithUser),
    });

    if (response.ok) {
      const createdExpense = await response.json();
      setExpenses([...expenses, createdExpense]);
      handleClose();
    } else {
      console.error('Failed to create expense');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>All Expenses</h2>
      <Grid container style={{ marginLeft: "10px", border: "2px solid green" }}>
        {expenses.map(expense => (
          <Grid item xs={4} key={expense.id}>
            <Card variant="outlined" style={{ height: "200px", width: "300px", border: "2px solid red" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {expense.expenseName}
                </Typography>
                <Typography color="text.secondary">
                  Amount: {expense.amount}
                </Typography>
                <Typography color="text.secondary">
                  Paid By: {expense.paidBy}
                </Typography>
                <Typography color="text.secondary">
                  Payment Mode: {expense.paymentMode}
                </Typography>
                <Typography color="text.secondary">
                  Group ID: {expense.groupId}
                </Typography>
                <Typography color="text.secondary">
                  Comments: {expense.comments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="secondary"
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
              <Button type="submit" variant="contained" color="secondary">
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

