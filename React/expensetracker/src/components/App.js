import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar/Navbar";
import Layout from "./Layout";
import Settlements from "./Dashboard/Settlements";
import AllGroups from "./Groups/AllGroups";
import AllExpenses from "./Expenses/AllExpenses";
import GroupDetails from "./Groups/GroupDetails";
import UsersList from "./UserList";
import UserForm from "./UserForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  return (
    <Router >
      <div id="app">
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Settlements />} />
            <Route path="/groups" element={<AllGroups />} />
            <Route path="/groups/:id" element={<GroupDetails />} />
            <Route path="/expense" element={<AllExpenses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<UserForm />} />
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<UsersList />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
