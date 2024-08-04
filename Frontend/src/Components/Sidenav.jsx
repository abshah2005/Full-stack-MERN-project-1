// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link, useLocation } from "react-router-dom";

// const Sidenav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setIsOpen(open);
//   };

//   const list = () => (
//     <div
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//       className="bg-dark-800 text-black"
//     >
//       <List >
//         <ListItem
//           button
//           component={Link}
//           to="/"
//           selected={location.pathname === "/"}
//           className="hover:bg-dark-700 p-5"
//           sx={{ 
//             fontSize: '1.5rem', // text-2xl equivalent
//             padding: '1.25rem', // p-5 equivalent
//             '&:hover': {
//               backgroundColor: 'rgba(0, 0, 0, 0.04)', 
//             }
//           }}
//         >
//           <ListItemText primary="Home" className="text-lg" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/Products"
//           selected={location.pathname === "/Products"}
//           className="hover:bg-dark-700"
//         >
//           <ListItemText primary="Products" className="text-lg" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/Categories"
//           selected={location.pathname === "/Categories"}
//           className="hover:bg-dark-700"
//         >
//           <ListItemText primary="Categories" className="text-lg" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/returnPolicy"
//           selected={location.pathname === "/returnPolicy"}
//           className="hover:bg-dark-700"
//         >
//           <ListItemText primary="Return Policy" className="text-lg" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       <IconButton
//         color="inherit"
//         aria-label="open drawer"
//         edge="start"
//         onClick={toggleDrawer(true)}
//         sx={{ display: { sm: "block", md: "none" } }}
//         className="text-white"
//       >
//         <GiHamburgerMenu />
//       </IconButton>
//       <Drawer
//         PaperProps={{ sx: { width: 250 } }}
//         anchor="left"
//         open={isOpen}
//         onClose={toggleDrawer(false)}
//         className="bg-dark-800"
//       >
//         {list()}
//       </Drawer>
//     </div>
//   );
// };

// export default Sidenav;


import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ backgroundColor: '#333', color: '#fff' }} 
    >
      <List>
        {[
          { text: 'Home', path: '/' },
          { text: 'Products', path: '/Products' },
          { text: 'Categories', path: '/Categories' },
          { text: 'Return Policy', path: '/returnPolicy' },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              fontSize: 'rem', // Standard font size
              padding: '0.75rem 1rem', // Padding for list items
              backgroundColor: location.pathname === item.path ? '#444' : 'inherit', // Different color for selected item
              '&:hover': {
                backgroundColor: '#555', // Hover effect
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ display: { sm: "block", md: "none" } }}
      >
        <GiHamburgerMenu />
      </IconButton>
      <Drawer
        PaperProps={{ sx: { width: 250, backgroundColor: '#333', color: '#fff' } }} // Dark background for the drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidenav;

