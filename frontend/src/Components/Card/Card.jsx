import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function CustomCard({ item }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Card sx={{ width: 285 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width={194}
          height="194"
          sx={{ objectFit: "cover" }}
          image={`http://localhost:8000/images/${item.productImage}`}
          alt="Paella dish"
        />
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {item.productName}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Price -: ${formatter.format(item.productPrice)}`}
          </Typography>
          <Typography sx={{ fontSize: 14, mb: 1.5 }} component="div">
            {item.productDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
