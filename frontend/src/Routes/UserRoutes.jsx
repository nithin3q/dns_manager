import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import UserPublic from "./UserPublic";
import Dashboard from "../Components/Dashboard";

export default function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route
          path="/records"
          element={
            // <UserPublic>
              <Dashboard />
            // </UserPublic>
          }
        />
      </Routes>
    </div>
  );
}
