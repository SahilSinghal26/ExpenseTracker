import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import GroupCard from "../Card/GroupCard";
import "./AllGroups.css";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  gap: 66px;
`;

const GroupList = ({ groups}) => (
  <div style={{ textAlign: "center" }}>
    <h2>Your Groups</h2>
    <GridContainer>
      {groups.map((group) => (
          <GroupCard group={group}/>
      ))}
    </GridContainer>
  </div>
);

const AllGroups = () => {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState(""); // Initialize username state

  useEffect(() => {
    setUsername(sessionStorage.getItem("username")); // Retrieve username from session storage
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    // console.log("before the try block");
    try {
      const response = await fetch("http://localhost:8080/groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      // console.log("after fetching response from api");

      if (response.ok) {
        // console.log("getting ok response");
        // console.log(response);
        // console.log("response log")
        // console.log(response.json)
        const data = await response.json();

        // console.log(data);
        setGroups(data);
      } else {
        // console.log("not getting ok response");
        console.error("Failed to fetch groups:", response.statusText);
      }
    } catch (error) {
      // console.log("some other error");
      console.error("Error fetching groups:", error);
    }
  };

  const handleFabClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddGroup = async () => {
    try {
      const body = {
        name: groupName,
        admin: username, // Include username when adding a new group
      };
      
      const response = await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // console.log("after fetching data from api")

      if (response.ok) {
        console.log("response is ok")
        setOpen(false);
        setGroupName("");
        await fetchGroups();
      } else {
        // console.log("not getting ok response")
        console.error("Failed to add group:", response.statusText);
      }
    } catch (error) {
      // console.log("some other error")
      console.error("Error adding group:", error);
    }
  };

  return (
    <div>
      <>
        <GroupList groups={groups}/>
        <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "16px", right: "16px" }}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
      </>
      <Dialog open={open} onClose={handleClose} fullWidth="xs">
        <DialogTitle className="title">Add Group Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddGroup} color="primary" variant="contained">
            Add Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllGroups;