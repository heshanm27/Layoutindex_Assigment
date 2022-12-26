import { Box, Collapse, Divider, List, ListItemButton, ListItemText, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FetchContext } from "../../Contexts/FeatchContext";
import { useContext } from "react";
import { Stack } from "@mui/system";

export default function DrawerContent() {
  const [categorIes, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState("");
  const [curruntCategory, setCurrentCategory] = useState({
    parent: "",
    sub: "",
  });
  const [refetch, setRefetch] = useState(false);

  const [filter, setFilter] = useState([0, 10000]);

  const { setProduct, setLoading, setNotify } = useContext(FetchContext);

  const handleClick = async (id) => {
    setCurrentCategory({
      sub: "",
      parent: id,
    });

    setLoading(true);
    setOpenCategory((prev) => (prev !== id ? id : ""));
    try {
      const { data } = await AxiosRequest.get(`/product/${id}`);
      setProduct(data.data);
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);

      setNotify({
        isOpen: true,
        message: response.data.error,
        type: "error",
      });
    }
  };

  //handle range and filter
  const handleRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setFilter([Math.min(newValue[0], filter[1] - 500), filter[1]]);
    } else {
      setFilter([filter[0], Math.max(newValue[1], filter[0] + 500)]);
    }

    if (curruntCategory.sub !== "") {
      setTimeout(async () => {
        try {
          const { data } = await AxiosRequest.get(`/product/${curruntCategory.parent}/${curruntCategory.sub}?min=${filter[0]}&max=${filter[1]} `);
          setProduct(data.data);
          setLoading(false);
        } catch ({ response }) {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: response.data.error,
            type: "error",
          });
        }
      }, [200]);
    } else {
      setTimeout(async () => {
        try {
          const { data } = await AxiosRequest.get(`/product/${curruntCategory.parent}?min=${filter[0]}&max=${filter[1]} `);
          setProduct(data.data);
          setLoading(false);
        } catch ({ response }) {
          setLoading(false);
          setNotify({
            isOpen: true,
            message: response.data.error,
            type: "error",
          });
        }
      }, [100]);
    }
  };

  //handle sub categorey
  const hadnleClickSubCategory = async (parentId, subcategorey) => {
    setCurrentCategory({
      sub: subcategorey,
      parent: parentId,
    });

    setLoading(true);
    try {
      const { data } = await AxiosRequest.get(`/product/${parentId}/${subcategorey}`);
      setProduct(data.data);
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
      setNotify({
        isOpen: true,
        message: response.data.error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosRequest.get("/category");
        setCategories(data.data);
        handleClick(data.data[0]._id);
      } catch ({ response }) {
        setNotify({
          isOpen: true,
          message: response.data.error,
          type: "error",
        });
      }
    })();
  }, [refetch]);

  return (
    <Box sx={{ p: 2 }}>
      <Divider />
      <Typography sx={{ fontSize: 16, p: 2 }}>Category</Typography>
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
      <Box sx={{ mt: 2 }}>
        <Stack direction="column" justifyContent={"center"} sx={{ p: 2 }}>
          <Typography sx={{ mt: 2, mb: 2 }}>Price Filter</Typography>
          <Stack direction="row" justifyContent={"space-between"}>
            <span id="range-value-left">{"$" + filter[0]}</span>
            <span id="range-value-right">{"$" + filter[1]} </span>
          </Stack>

          <Slider min={0} max={10000} value={filter} onChange={handleRangeChange} disableSwap />
        </Stack>
      </Box>
    </Box>
  );
}
