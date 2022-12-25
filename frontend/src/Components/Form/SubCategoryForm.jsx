import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";

// const initCategory = {
//   categoryName: "",
//   parent: "",
//   sub: [],
// };

export default function SubCategoryForm() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState();
  const [mainCategories, setMainCategoreies] = useState([]);
  const [error, setError] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSelect = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const { data } = await AxiosRequest.get("/category");
      console.log(data.data);
      setMainCategoreies(data.data);
    })();
  }, []);
  return (
    <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
      <form>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <InputLabel id="category-label">Main Category</InputLabel>
          <Select name="productCategory" labelId="category-label" value={category} onChange={handleSelect}>
            {mainCategories &&
              mainCategories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.categoryName}
                </MenuItem>
              ))}
          </Select>
          {/* {error.productCategory && <FormHelperText error>{error.productCategory}</FormHelperText>} */}
        </FormControl>

        <TextField fullWidth disabled={category === "" ? true : false} id="outlined-basic" label="Sub Categorey name" variant="outlined" />

        <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
          {!loading ? (
            <Button type="submit" variant="contained" fullWidth color="primary">
              Submit
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Stack>
      </form>
    </Stack>
  );
}
