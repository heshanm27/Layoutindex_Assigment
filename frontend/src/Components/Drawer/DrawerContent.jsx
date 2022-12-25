import { Box, Collapse, Divider, List, ListItem, ListItemButton, ListItemText, Radio, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DrawerContent({ setProduct }) {
  const [categorIes, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState("");

  const handleClick = async (id) => {
    setOpenCategory((prev) => (prev !== id ? id : ""));
    const { data } = await AxiosRequest.get(`/product`);
    console.log(data);
    setProduct(data.data);
  };

  const hadnleClickSubCategory = (aprentId, subId) => {
    console.log(aprentId, subId);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosRequest.get("/category");
        setCategories(data.data);
        handleClick(data.data[0]._id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List key={5}>
        {categorIes &&
          categorIes.map((category, index) => (
            <Box key={index}>
              <ListItemButton onClick={() => handleClick(category._id)}>
                <ListItemText primary={category.categoryName} />
                {category.sub && openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory === category._id} timeout="auto" unmountOnExit key={category._id + category.sub._id}>
                <List component="ul">
                  {category.sub &&
                    category.sub.map((subCategory, index) => (
                      <ListItemButton onClick={() => hadnleClickSubCategory(category._id, subCategory._id)} key={subCategory._id + index}>
                        <ListItemText primary={subCategory.categoryName} />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </Box>
          ))}
      </List>
      <Divider />
    </div>
  );
}
