import { Box, Button, Chip, Container, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
  productImage: "",
};

export default function ProductFrom() {
  const [product, setProduct] = useState(initProduct);
  const [error, setErrors] = useState(false);
  const [image, setImage] = useState(null);
  const [mainCategorey, setMainCategorey] = useState([]);
  const [subCategoreies, setSubCategoreies] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosRequest.get("/category");
      setMainCategorey(data.data);
    })();
  }, []);

  //handle input changes
  const handlehanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Validate form
  const validate = () => {
    let temp = {};
    temp.productName = product.productName === "" ? "Please enter product name" : "";
    temp.productPrice = (product.productPrice === "" ? "Please product price" : "") || (product.productPrice < 0 ? "Please enter valid price" : "");
    temp.productDescription = product.productDescription === "" ? "Please enter product discription" : "";
    temp.productCategory = product.productCategory === "" ? "Please select product category" : "";
    temp.productSubCategory = product.productSubCategory.length === 0 ? "Please select product sub category" : "";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  //handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // setImage(file);

    setProduct((prev) => ({
      ...prev,
      productImage: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //handle main categorey change
  const handleMainCategoreyChange = async (event) => {
    setProduct((prev) => ({
      ...prev,
      productCategory: event.target.value,
    }));
    const { data } = await AxiosRequest.get(`category/${event.target.value}/sub`);
    setSubCategoreies(data.data.sub);
  };

  //handle sub categorey change
  const handleSubCategoreyChange = (event) => {
    setProduct((prev) => ({
      ...prev,
      productSubCategory: [...prev.productSubCategory, event.target.value],
    }));
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("productPrice", product.productPrice);
      formData.append("productDescription", product.productDescription);
      formData.append("productCategory", product.productCategory);
      formData.append("productSubCategory", product.productSubCategory);
      formData.append("productImage", product.productImage);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      console.log(formData);
    }

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
            {error.productCategory && <FormHelperText error>{error.productCategory}</FormHelperText>}
          </FormControl>

          <FormControl>
            <InputLabel id="category-label" sx={{ p: -3 }}>
              Sub Category
            </InputLabel>
            <Select
              labelId="category-label"
              multiple
              value={product.productSubCategory}
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
                  <MenuItem key={item._id} value={item.categoryName}>
                    {item.categoryName}
                  </MenuItem>
                ))}
            </Select>
            {error.productSubCategory ? <FormHelperText error>{error.productSubCategory}</FormHelperText> : null}
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
              {error.productImage ? <FormHelperText error>{error.productImage}</FormHelperText> : null}
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
