import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiHamburgerMenu } from "react-icons/gi";
import { gsap } from "gsap";

const Sidebar = ({ items, handleLinkClick }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(() => {
    if (state.left) {
      gsap.fromTo(
        ".list-item",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [state.left]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-gray-800 text-white h-full"
    >
      <List className="relative top-10">
        {items.map((item) => (
          <ListItem key={item.id} disablePadding className="list-item">
            <ListItemButton
              onClick={() => handleLinkClick(item.title)}
              className="hover:bg-gray-500"
            >
              <ListItemIcon className="text-3xl pt-5 pb-5 pl-2">
                {React.cloneElement(item.icon, { className: "text-white" })}
              </ListItemIcon>
              <ListItemText className="pt-5 pb-5" primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <GiHamburgerMenu
            color="white"
            className="text-2xl relative left-5 cursor-pointer"
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={() => gsap.fromTo(
              ".list-item",
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }
            )}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
