import { Button, CircularProgress, FormHelperText, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import { FetchContext } from "../../Contexts/FeatchContext";
export default function ParentCategoryForm({ setOpen }) {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [fieldValidation, setFieldValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const { setNotify } = useContext(FetchContext);
  const validate = () => {
    if (category === "") {
      setFieldValidation("Category name is required");
      return false;
    } else {
      setFieldValidation("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        await AxiosRequest.post("/category", { categoryName: category });
        setOpen(false);
        setLoading(false);
        setNotify({
          isOpen: true,
          message: "New parent categeory successfuly added",
          type: "success",
        });
      } catch ({ response }) {
        setLoading(false);
        setError("Error -: " + response.data.error);
        setNotify({
          isOpen: true,
          message: response.data.error,
          type: "error",
        });
      }
    }
    setLoading(false);
  };
  return (
    <Stack direction="column" spacing={2} sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          onChange={(e) => setCategory(e.target.value)}
          id="outlined-basic"
          helperText={fieldValidation ? fieldValidation : "Enter category name"}
          error={fieldValidation !== "" ? true : false}
          label="Parent Categorey Name"
          variant="outlined"
        />
        {error && (
          <FormHelperText sx={{ mt: 2, fontSize: 16 }} error>
            {error}
          </FormHelperText>
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
