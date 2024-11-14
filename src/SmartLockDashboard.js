import React, { useState } from "react";
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

  // Dummy data remains the same...
  const users = [
    {
      id: 1,
      name: "John Doe",
      pin: "1234",
      rfid: "123456789",
      issuedOn: "2023-04-01",
      hasAccess: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      pin: "5678",
      rfid: "987654321",
      issuedOn: "2023-05-15",
      hasAccess: false,
    },
  ];

  const accessLog = [
    { id: 1, user: "John Doe", time: "2023-06-01 10:30:00", status: "Allowed" },
    {
      id: 2,
      user: "Jane Smith",
      time: "2023-06-02 15:45:00",
      status: "Not Allowed",
    },
    { id: 3, user: "John Doe", time: "2023-06-03 14:20:00", status: "Allowed" },
    {
      id: 4,
      user: "Jane Smith",
      time: "2023-06-04 09:15:00",
      status: "Not Allowed",
    },
  ];

  // Handler functions remain the same...
  const handleOpenUserDialog = () => setShowUserDialog(true);
  const handleCloseUserDialog = () => setShowUserDialog(false);
  const handleOpenSAModal = () => setShowSAModal(true);
  const handleCloseSAModal = () => setShowSAModal(false);
  const handleOpenSADrawer = () => setShowSADrawer(true);
  const handleCloseSADrawer = () => setShowSADrawer(false);
  const handleAddUser = () => {
    console.log("New user:", newUser);
    setNewUser({ name: "", pin: "" });
    handleCloseUserDialog();
  };
  const handleSASubmit = () => {
    console.log("SA Pin:", saPin);
    setSAPin("");
    handleCloseSAModal();
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
              <StyledButton variant="contained" className="w-full">
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
                      key={entry.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4">{entry.id}</TableCell>
                      <TableCell className="py-4">{entry.user}</TableCell>
                      <TableCell className="py-4">{entry.time}</TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            entry.status === "Allowed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.status}
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
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.pin}</TableCell>
                  <TableCell>{user.rfid}</TableCell>
                  <TableCell>{user.issuedOn}</TableCell>
                  <TableCell>{user.hasAccess ? "Yes" : "No"}</TableCell>
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
