import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export interface Props {
  items: ItemProps[];
}

export interface ItemProps {
  icon?: React.ReactElement;
  label: string;
  url: string;
}

const Menu: React.FC<Props> = ({ items }) => {
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number, url: string) => {
    setSelectedIndex(index);
    history.push(url);
  };

  return (
    <>
      {items.map((mi, i) => (
        <ListItem
          key={i}
          button
          selected={selectedIndex === i}
          onClick={() => handleListItemClick(i, mi.url)}
        >
          <ListItemIcon>{mi.icon}</ListItemIcon>
          <ListItemText primary={mi.label} />
        </ListItem>
      ))}
    </>
  );
};

export default Menu;
