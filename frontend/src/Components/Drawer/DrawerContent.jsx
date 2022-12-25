import { Box, Collapse, Divider, Input, List, ListItem, ListItemButton, ListItemText, Radio, Slider, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DrawerContent({ setProduct }) {
  const [categorIes, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState("");
  const [filter, setFilter] = useState({});
  const [range, setRange] = useState();
  const handleClick = async (id) => {
    setOpenCategory((prev) => (prev !== id ? id : ""));
    const { data } = await AxiosRequest.get(`/product`);
    console.log(data);
    setProduct(data.data);
  };

  const handleRangeChange = (event, newValue) => {
    setRange(newValue);
    console.log(newValue);
  };

  const hadnleClickSubCategory = (parentId, subcategorey) => {
    const { data } = AxiosRequest.get(`/product/${parentId}/${subcategorey}`);
    setProduct(data.data);
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
    <Box sx={{ p: 2 }}>
      <Divider />
      <Typography sx={{ color: "gray", fontSize: 16, p: 2 }}>Category</Typography>
      <Divider />
      <List key={5}>
        {categorIes &&
          categorIes.map((category, index) => (
            <Box key={index}>
              <ListItemButton onClick={() => handleClick(category._id)}>
                <ListItemText primary={category.categoryName} />
                {category.sub.length !== 0 && openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCategory === category._id} timeout="auto" unmountOnExit key={category._id + category.sub._id}>
                <List component="ul">
                  {category.sub &&
                    category.sub.map((subCategory, index) => (
                      <ListItemButton onClick={() => hadnleClickSubCategory(category._id, subCategory.categoryName)} key={subCategory._id + index}>
                        <ListItemText primary={subCategory.categoryName} />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </Box>
          ))}
      </List>
      <Divider />
      <Box sx={{ mt: 10 }}>
        <input type="range" min="0" max="60000" value={range} onChange={handleRangeChange} />
      </Box>
    </Box>
  );
}
