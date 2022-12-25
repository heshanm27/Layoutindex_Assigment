import { Box, Tab, Tabs } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import ParentCategoryForm from "../Form/ParentCategoryForm";
import SubCategoryForm from "../Form/SubCategoryForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {children}
    </div>
  );
}

export default function CustomTabs({ setOpen }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Parent Categorey" />
          <Tab label="Add Sub Category" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ParentCategoryForm setOpen={setOpen} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubCategoryForm setOpen={setOpen} />
      </TabPanel>
    </Container>
  );
}
