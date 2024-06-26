import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [groupAdmin, setGroupAdmin] = useState(null); // State to store the group admin's username
  const [groupName, setGroupName] = useState(""); // State to store the group name
  const [members, setMembers] = useState([]); // State to store the group members

  useEffect(() => {
    const fetchGroupDetails = async () => {
      setIsFetching(true);
      try {
        // Fetch group details
        const response = await fetch(`http://localhost:8080/groups/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch group details");
        }
        const groupData = await response.json();
        setGroup(groupData);
        setGroupName(groupData.name); // Set the group name
        setGroupAdmin(sessionStorage.getItem("username")); // Retrieve group admin's username from session storage

        // Fetch group members
        const membersResponse = await fetch(
          `http://localhost:8080/groups/${id}/members`
        );
        if (!membersResponse.ok) {
          throw new Error("Failed to fetch group members");
        }
        // console.log(mem)
        const membersData = await membersResponse.json();
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  return (
    <>
      {isFetching ? (
        <CircularProgress color="inherit" />
      ) : group ? (
        <div style={{ width: "100%", height: "100%" }}>
          <h1 style={{ textAlign: "center" }}>{groupName}</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h5>Group Admin: {groupAdmin}</h5>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-header">Members</div>
                <div className="card-body">
                  <ul>
                    {members.map((member) => (
                      <li key={member.id}>{member.name}</li>
                    ))}
                  </ul>
                </div>
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "3px",
                    cursor: "pointer",
                    color: "green",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-header">Expenses</div>
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "3px",
                    cursor: "pointer",
                    color: "green",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </span>
                <div className="card-body">
                  Group Expenses List
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>No Group found</>
      )}
    </>
  );
};

export default GroupDetails;
