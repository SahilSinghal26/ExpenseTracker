import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  gap: 66px;
`;

const FixedFab = styled(Fab)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
`;

const GroupList = ({ groups, onGroupClick, }) => (
  <div style={{ textAlign: "center" }}>
    <h1>Your groups</h1>
    <GridContainer>
      {groups.map((group) => (
        <Box key={group.id} sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                {group.name}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                Created by: {group.admin} {/* Display the username */}
              </div>
              <div
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={() => onGroupClick(group)}
              >
                View More details
              </div>
            </CardContent>
          </Card>
        </Box>
      ))}
    </GridContainer>
  </div>
);

const AllGroups = () => {
  const navigate = useNavigate();
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

  const groupDetailsClick = (group) => {
    navigate(`/groups/${group.id}`);
  };

  return (
    <div>
      <>
        <GroupList groups={groups} onGroupClick={groupDetailsClick} username={username} />
        <FixedFab color="secondary" aria-label="add" onClick={handleFabClick}>
          <AddIcon />
        </FixedFab>
      </>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Group Details</DialogTitle>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddGroup} color="primary">
            Add Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllGroups;