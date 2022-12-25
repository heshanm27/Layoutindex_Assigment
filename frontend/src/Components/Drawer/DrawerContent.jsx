import { Collapse, Divider, List, ListItem, ListItemButton, ListItemText, Radio, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DrawerContent() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorIes, setCategories] = useState([]);

  const [openCategory, setOpenCategory] = useState("");
  const handleClick = (id) => {
    setOpenCategory(id);
    console.log(id);
  };

  const hadnleClickSubCategory = (aprentId, subId) => {
    console.log(aprentId, subId);
  };

  const FetchCategory = async () => {
    try {
      const { data } = await AxiosRequest.get("/category");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchCategory();
  }, []);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {categorIes &&
          categorIes.map((category) => (
            <>
              <ListItemButton onClick={() => handleClick(category._id)} key={category._id}>
                <ListItemText primary={category.categoryName} />
                {category.sub && openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory === category._id} timeout="auto" unmountOnExit>
                <List component="ul">
                  {category.sub &&
                    category.sub.map((subCategory) => (
                      <ListItemButton onClick={() => hadnleClickSubCategory(category._id, subCategory._id)} key={subCategory._id}>
                        <ListItemText primary={subCategory.categoryName} />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </>
          ))}
      </List>
      <Divider />
    </div>
  );
}
