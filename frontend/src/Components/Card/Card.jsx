import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import CustomeDialog from "../Dialog/CustomDialog";
import ProductFrom from "../Form/ProductFrom";
import { Box } from "@mui/system";

export default function CustomCard({ item }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [openproductDialog, setOpenProductDialog] = React.useState(false);

  return (
    <Card sx={{ width: 285, height: 550 }}>
      <CardActionArea onClick={() => setOpenProductDialog(true)}>
        <CardMedia
          component="img"
          width={194}
          height="194"
          sx={{ objectFit: "cover" }}
          image={`http://localhost:8000/images/${item.productImage}`}
          alt="Paella dish"
        />
        <CardContent>
          <Box sx={{ maxHeight: "150px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical" }}>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
              {item.productName}
            </Typography>
          </Box>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Price -: ${formatter.format(item.productPrice)}`}
          </Typography>
          <Box sx={{ maxHeight: "150px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "7", WebkitBoxOrient: "vertical" }}>
            <Typography paragraph sx={{ fontSize: 14, mb: 1.5 }} component="div">
              {item.productDescription}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CustomeDialog title={"Update  Product"} open={openproductDialog} setOpen={setOpenProductDialog}>
        <ProductFrom setOpen={setOpenProductDialog} existingProduct={item} />
      </CustomeDialog>
    </Card>
  );
}
