import { Box, Collapse, Divider, List, ListItemButton, ListItemText, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FetchContext } from "../../Contexts/FeatchContext";
import { useContext } from "react";
import { Stack } from "@mui/system";
function valuetext(value) {
  return `${value}°C`;
}
export default function DrawerContent() {
  const [categorIes, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState("");

  const [filter, setFilter] = useState([0, 60000]);

  const { setProduct, setLoading } = useContext(FetchContext);

  const handleClick = async (id) => {
    setLoading(true);
    setOpenCategory((prev) => (prev !== id ? id : ""));
    try {
      const { data } = await AxiosRequest.get(`/product/${id}`);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setFilter([Math.min(newValue[0], filter[1] - 500), filter[1]]);
    } else {
      setFilter([filter[0], Math.max(newValue[1], filter[0] + 500)]);
    }
  };

  const hadnleClickSubCategory = async (parentId, subcategorey) => {
    setLoading(true);
    try {
      const { data } = await AxiosRequest.get(`/product/${parentId}/${subcategorey}`);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
                {category?.sub?.length !== 0 && openCategory ? <ExpandLess /> : <ExpandMore />}
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
        <Stack direction="column" justifyContent={"center"} sx={{ p: 2 }}>
          <Typography sx={{ mt: 2, mb: 2 }}>Price Filter</Typography>
          <Stack direction="row" justifyContent={"space-between"}>
            <span id="range-value-left">{"$" + filter[0]}</span>
            <span id="range-value-right">{"$" + filter[1]} </span>
          </Stack>

          <Slider min={0} max={100000} value={filter} onChange={handleRangeChange} valueLabelDisplay="auto" getAriaValueText={valuetext} disableSwap />
        </Stack>
      </Box>
    </Box>
  );
}
