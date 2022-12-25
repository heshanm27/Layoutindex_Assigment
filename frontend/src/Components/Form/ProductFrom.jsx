import { Box, Button, Chip, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import { useEffect } from "react";

const initProduct = {
  productName: "",
  productPrice: "",
  productDescription: "",
  productCategory: "",
  productSubCategory: [],
};

export default function ProductFrom() {
  const [product, setProduct] = useState(initProduct);
  const [error, setErrors] = useState(false);
  const [image, setImage] = useState(null);
  const [mainCategorey, setMainCategorey] = useState([]);
  const [subCategoreies, setSubCategoreies] = useState();
  const [subCategorey, setSubCategorey] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosRequest.get("/category");
      setMainCategorey(data.data);
    })();
  }, []);

  const handlehanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let temp = {};
    temp.productName = product.productName === "" ? "Please enter product name" : "";
    temp.productPrice = (product.productPrice === "" ? "Please product price" : "") || (product.productPrice < 0 ? "Please enter valid price" : "");
    temp.productDescription = product.productDescription === "" ? "Please enter product discription" : "";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMainCategoreyChange = async (event) => {
    // setMainCategorey(event.target.value);
    setProduct((prev) => ({
      ...prev,
      productCategory: event.target.value,
    }));
    const { data } = await AxiosRequest.get(`category/${event.target.value}/sub`);
    console.log(data.data);
    setSubCategoreies(data.data.sub);
  };

  const handleSubCategoreyChange = (event) => {};
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
    }
    console.log(event);
    const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("price", price);
    // formData.append("image", image);
    console.log(formData);

    // axios.post('/api/products', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }).then((response) => {
    //   console.log(response.data);
    // }).catch((error) => {
    //   console.error(error);
    // });
  };
  return (
    <Container sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <FormControl>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={product.productName}
              onChange={handlehanges}
              helperText={error.productName ? error.productName : "Enter product name"}
              error={error.productName ? true : false}
            />
          </FormControl>
          <FormControl>
            <TextField
              multiline
              fullWidth
              name="productDescription"
              label="Product Description"
              helperText={error.productDescription ? error.productDescription : "Enter product discription"}
              error={error.productDescription ? true : false}
              rows={4}
              value={product.productDescription}
              onChange={handlehanges}
            />
          </FormControl>
          <FormControl>
            <TextField
              defaultValue={0}
              name="productPrice"
              fullWidth
              label="Product Price"
              helperText={error.productPrice ? error.productPrice : "Enter product price"}
              error={error.productPrice ? true : false}
              type="number"
              value={product.productPrice}
              onChange={handlehanges}
            />
          </FormControl>

          <FormControl>
            <InputLabel id="category-label">Main Category</InputLabel>
            <Select name="productCategory" labelId="category-label" value={product.productCategory} onChange={handleMainCategoreyChange}>
              {mainCategorey &&
                mainCategorey.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="category-label">Sub Category</InputLabel>
            <Select
              labelId="category-label"
              value={subCategorey}
              onChange={handleSubCategoreyChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value.categoryName} />
                  ))}
                </Box>
              )}
            >
              {subCategoreies &&
                subCategoreies.map((item) => (
                  <MenuItem key={item._id} value={item}>
                    {item.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <div>
            <FormControl>
              <Input
                fullWidth
                color="primary"
                sx={{ mt: 2, mb: 2 }}
                type="file"
                inputProps={{ accept: "image/jpg, image/png, image/jpeg" }}
                onChange={handleImageChange}
              />
            </FormControl>
            {imageUrl ? <img height="25%" width="100%" src={imageUrl} alt="Selected image" /> : null}
          </div>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
