import { Box, Button, Chip, CircularProgress, Container, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { AxiosRequest } from "../../Utils/DefaultAxios";
import { useEffect } from "react";
import { FetchContext } from "../../Contexts/FeatchContext";
const initProduct = {
  productName: "",
  productPrice: "",
  productDescription: "",
  productCategory: "",
  productSubCategory: [],
  productImage: "",
};

export default function ProductFrom({ setOpen, existingProduct }) {
  const { setNotify } = useContext(FetchContext);
  const [product, setProduct] = useState(initProduct);
  const [error, setErrors] = useState(false);
  const [image, setImage] = useState(null);
  const [mainCategorey, setMainCategorey] = useState([]);
  const [subCategoreies, setSubCategoreies] = useState();
  const [subOptionCategorey, setsubOptionCategorey] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosRequest.get("/category");
      setMainCategorey(data.data);
    })();

    //set existing product values to update
    if (existingProduct) {
      setProduct(existingProduct);
      console.log(existingProduct.productSubCategory);
      setsubOptionCategorey(existingProduct.productSubCategory);

      (async () => {
        const { data } = await AxiosRequest.get(`category/${existingProduct.productCategory}/sub`);
        setSubCategoreies(data.data.sub);
      })();
    }
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
    setsubOptionCategorey(event.target.value);
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("productPrice", product.productPrice);
      formData.append("productDescription", product.productDescription);
      formData.append("productCategory", product.productCategory);
      formData.append("productSubCategory", subOptionCategorey);
      formData.append("productImage", product.productImage);

      if (existingProduct) {
        AxiosRequest.put(`/product/${existingProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            setLoading(false);
            setNotify({
              isOpen: true,
              message: "Product updated successfuly",
              type: "success",
            });
            setOpen(false);
          })
          .catch((response) => {
            setLoading(false);
            setNotify({
              isOpen: true,
              message: response.data.error,
              type: "error",
            });
          });
      } else {
        AxiosRequest.post("/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            setLoading(false);
            setNotify({
              isOpen: true,
              message: "New product successfuly added",
              type: "success",
            });
            setOpen(false);
          })
          .catch((response) => {
            setLoading(false);
            console.error(error);
            setNotify({
              isOpen: true,
              message: response.data.error,
              type: "error",
            });
          });
      }
    }
  };
  return (
    <Container sx={{ mt: 2 }}>
      <form enctype="multipart/form-data" onSubmit={handleSubmit}>
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
          </FormControl>

          <div>
            <FormControl>
              <Input
                fullWidth
                color="primary"
                name="productImage"
                sx={{ mt: 2, mb: 2 }}
                type="file"
                inputProps={{ accept: "image/jpg, image/png, image/jpeg" }}
                onChange={handleImageChange}
              />
              {error.productImage ? <FormHelperText error>{error.productImage}</FormHelperText> : null}
            </FormControl>
            {/* if image is selected then show it else if existing product then show existing product image */}
            {imageUrl ? (
              <img height="25%" width="100%" src={imageUrl} alt="Selected" />
            ) : existingProduct ? (
              <img height="25%" width="100%" src={`http://localhost:8000/images/${existingProduct.productImage}`} alt="Selected" />
            ) : null}
          </div>
          <br />
          <Stack direction="row" sx={{ width: "100%" }} justifyContent="center" alignItems="center">
            {!loading ? (
              <Button type="submit" variant="contained" color="primary">
                {existingProduct ? "Update" : "Add Product"}
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
