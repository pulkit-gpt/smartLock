import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  TextField,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/system";
import { API_URL } from "./App";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const StyledButton = styled(Button)({
  backgroundColor: "#3c3e50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#34495e",
  },
  padding: "12px 16px",
  borderRadius: "10px",
  fontSize: "14px",
  minWidth: "120px",
});

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#7f8c8d",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#7f8c8d",
    },
    "&:hover fieldset": {
      borderColor: "#2c3e50",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2c3e50",
    },
  },
});

const SmartLockDashboard = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showSAModal, setShowSAModal] = useState(false);
  const [showSADrawer, setShowSADrawer] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", pin: "" });
  const [saPin, setSAPin] = useState("");

  // State for users and access log
  const [users, setUsers] = useState([]);
  const [accessLog, setAccessLog] = useState([]);

  useEffect(() => {
    // Fetch users from the 'auth_users' table
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("auth_users").select("*"); // Replace with your actual query

      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data);
      }
      console.log("Users:", data);
    };

    // Fetch access logs from the 'log' table
    const fetchAccessLog = async () => {
      const { data, error } = await supabase.from("access_logs").select("*"); // Replace with your actual query

      if (error) {
        console.error("Error fetching access log:", error.message);
      } else {
        setAccessLog(data);
      }
      console.log("Access Log:", data);
    };

    fetchUsers();
    fetchAccessLog();
  }, []); // Empty dependency array to fetch data once on mount

  const handleOpenUserDialog = () => setShowUserDialog(true);
  const handleCloseUserDialog = () => setShowUserDialog(false);
  const handleOpenSAModal = () => setShowSAModal(true);
  const handleCloseSAModal = () => setShowSAModal(false);
  const handleOpenSADrawer = () => setShowSADrawer(true);
  const handleCloseSADrawer = () => setShowSADrawer(false);
  const handleAddUser = () => {
    console.log("New user:", newUser);
    try {
      const response = fetch(`http://${API_URL}/app/add_new_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
    setNewUser({ name: "", pin: "" });
    handleCloseUserDialog();
  };
  const handleSASubmit = () => {
    console.log("SA Pin:", saPin);
    try {
      const response = fetch(`http://${API_URL}/app/timed_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin: saPin }),
      });
    } catch (error) {
      console.error("Error setting SA Pin:", error.message);
    }
    setSAPin("");
    handleCloseSAModal();
  };
  const handleOpen = () => {
    try {
      const response = fetch(`http://${API_URL}/app/open_door`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error opening the lock:", error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex flex-col">
        <AppBar position="static" className="bg-[#2c3e50]">
          <Toolbar className="px-6">
            <Typography variant="h6" className="flex-1 font-bold">
              SmartLock Dashboard
            </Typography>
            <Typography variant="body2" className="font-medium">
              Hi, Pulkit
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              <StyledButton
                variant="contained"
                className="w-full"
                onClick={handleOpen}
              >
                Open
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleOpenUserDialog}
                className="w-full"
              >
                Users
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleOpenSAModal}
                className="w-full"
              >
                Set SA Pin
              </StyledButton>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 overflow-hidden flex flex-col">
            <Typography variant="h5" className="font-bold mb-6">
              Access Log
            </Typography>
            <div className="overflow-auto flex-1">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold bg-gray-50">
                      Serial
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-50">
                      Accessed By
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-50">
                      Time
                    </TableCell>
                    <TableCell className="font-semibold bg-gray-50">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accessLog.map((entry) => (
                    <TableRow
                      key={entry.srno}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4">{entry.uuid}</TableCell>
                      <TableCell className="py-4">
                        {entry.accessed_by}
                      </TableCell>
                      <TableCell className="py-4">
                        {entry.accessed_at_time}
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            entry.access_given === true
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.access_given}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals remain the same... */}
      <StyledModal open={showUserDialog} onClose={handleCloseUserDialog}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl m-6">
          <Typography variant="h5" gutterBottom className="font-bold">
            Users
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Pin</TableCell>
                <TableCell>RFID</TableCell>
                <TableCell>Issued On</TableCell>
                <TableCell>Has Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uuid}>
                  <TableCell>{user.uuid}</TableCell>
                  <TableCell>{user.issued_to}</TableCell>
                  <TableCell>
                    {
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.type === "Pin"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      ></span>
                    }
                  </TableCell>
                  <TableCell>
                    {" "}
                    {
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.type === "RFID"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      ></span>
                    }
                  </TableCell>
                  <TableCell>{user.issued_at}</TableCell>
                  <TableCell>{user.access ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 space-x-4 flex items-center">
            <StyledTextField
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              variant="outlined"
              className="flex-1"
            />
            <StyledTextField
              label="Pin"
              value={newUser.pin}
              onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })}
              variant="outlined"
              className="flex-1"
            />
            <StyledButton variant="contained" onClick={handleAddUser}>
              Add User
            </StyledButton>
          </div>
        </div>
      </StyledModal>

      <StyledModal open={showSAModal} onClose={handleCloseSAModal}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md m-6">
          <Typography variant="h5" gutterBottom className="font-bold">
            Set SA Pin
          </Typography>
          <StyledTextField
            label="SA Pin"
            value={saPin}
            onChange={(e) => setSAPin(e.target.value)}
            variant="outlined"
            className="w-full"
          />
          <div className="mt-4 flex justify-end">
            <StyledButton variant="contained" onClick={handleSASubmit}>
              Submit
            </StyledButton>
          </div>
        </div>
      </StyledModal>

      <Drawer anchor="bottom" open={showSADrawer} onClose={handleCloseSADrawer}>
        <div className="p-6 bg-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <Typography variant="h5" className="font-bold">
              SA Pin
            </Typography>
            <StyledButton variant="contained" onClick={handleCloseSADrawer}>
              Close
            </StyledButton>
          </div>
          <Divider className="my-4" />
          <StyledTextField
            label="SA Pin"
            value={saPin}
            onChange={(e) => setSAPin(e.target.value)}
            variant="outlined"
            className="w-full"
          />
          <div className="mt-4">
            <StyledButton variant="contained" onClick={handleSASubmit}>
              Submit
            </StyledButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SmartLockDashboard;
