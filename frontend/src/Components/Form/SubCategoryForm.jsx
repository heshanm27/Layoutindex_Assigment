import { Button, Checkbox, Chip, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import { Box } from "@mui/system";
import { FetchContext } from "../../Contexts/FeatchContext";
// const initCategory = {
//   categoryName: "",
//   parent: "",
//   sub: [],
// };

function CreateSubCategorey({ category, setCategoryName, fieldValidation, categoryName }) {
  return (
    <>
      <TextField
        fullWidth
        disabled={category === "" ? true : false}
        id="outlined-basic"
        label="Sub Categorey name"
        variant="outlined"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      {fieldValidation && (
        <FormHelperText sx={{ mt: 2, fontSize: 16 }} error>
          {fieldValidation}
        </FormHelperText>
      )}
    </>
  );
}

function AddSubCategorey({ category, handleSubCategoreyChange, subCategoreies, subOptionCategorey, selectValidation }) {
  return (
    <FormControl disabled={category === "" ? true : false} fullWidth>
      <InputLabel id="category-label" sx={{ p: -3 }}>
        Sub Category
      </InputLabel>
      <Select
        labelId="category-label"
        multiple
        value={subOptionCategorey}
        onChange={handleSubCategoreyChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {subCategoreies &&
          subCategoreies.map((item) => (
            <MenuItem key={item.categoryName} value={item.categoryName}>
              {item.categoryName}
            </MenuItem>
          ))}
      </Select>
      {selectValidation && (
        <FormHelperText sx={{ mt: 2, fontSize: 16 }} error>
          {selectValidation}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default function SubCategoryForm({ setOpen }) {
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [mainCategories, setMainCategoreies] = useState([]);
  const [error, setError] = useState("");
  const [checkChoose, setCheckChoose] = useState(true);
  const [fieldValidation, setFieldValidation] = useState("");
  const [subOptionCategorey, setsubOptionCategorey] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategoreies, setSubCategoreies] = useState();
  const [selectValidation, setSelectValidation] = useState("");
  const { setRefetch, setNotify } = useContext(FetchContext);
  //handle sub categorey change
  const handleSubCategoreyChange = (event) => {
    setSubIds((prev) => [...prev, ...subCategoreies.filter((sub) => sub.categoryName == event.target.value)]);
    setsubOptionCategorey(event.target.value);
  };

  const validate = () => {
    if (categoryName === "") {
      setFieldValidation("Enter category name");
      return false;
    }

    setFieldValidation("");
    return true;
  };
  const selectValidate = () => {
    if (subOptionCategorey.length === 0) {
      setSelectValidation("Please Select one or more sub categorey");
      return false;
    }
    setSelectValidation("");
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectValidate());
    setLoading(true);
    if (checkChoose && validate()) {
      try {
        await AxiosRequest.post(`/category/${category}`, {
          categoryName,
        });
        setNotify({
          isOpen: true,
          message: "New sub categeory successfuly added",
          type: "success",
        });
        setLoading(false);
        setOpen(false);
      } catch ({ response }) {
        setLoading(false);
        setNotify({
          isOpen: true,
          message: response.data.error,
          type: "error",
        });
      }
    } else {
      if (selectValidate()) {
        try {
          await AxiosRequest.patch(`/category/${category}`, {
            subOptionCategorey: subIds,
          });
          setOpen(false);
          setNotify({
            isOpen: true,
            message: "New sub categeories successfuly added",
            type: "success",
          });
          setLoading(false);
        } catch ({ response }) {
          setNotify({
            isOpen: true,
            message: response.data.error,
            type: "error",
          });
          setLoading(false);
        }
      }
    }
  };
  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosRequest.get("/category");
        console.log(data.data);
        setMainCategoreies(data.data);
      } catch ({ response }) {
        setNotify({
          isOpen: true,
          message: response.data.error,
          type: "error",
        });
      }
    })();
    (async () => {
      try {
        const { data } = await AxiosRequest.get("/category/sub", {
          subOptionCategorey,
        });
        console.log(data.data);
        setSubCategoreies(data.data);
      } catch ({ response }) {
        setNotify({
          isOpen: true,
          message: response.data.error,
          type: "error",
        });
      }
    })();
  }, []);
  return (
    <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
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
          {error.productCategory && <FormHelperText error>{error.productCategory}</FormHelperText>}
        </FormControl>

        <Stack direction="row" justifyContent="start" alignItems="center">
          Create new sub categorey <Checkbox value={checkChoose} onChange={(e) => setCheckChoose((prev) => !prev)} />
        </Stack>

        {checkChoose ? (
          <AddSubCategorey
            category={category}
            subOptionCategorey={subOptionCategorey}
            subCategoreies={subCategoreies}
            handleSubCategoreyChange={handleSubCategoreyChange}
            selectValidation={selectValidation}
          />
        ) : (
          <CreateSubCategorey subCategory={categoryName} category={category} fieldValidation={fieldValidation} setCategoryName={setCategoryName} />
        )}

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
