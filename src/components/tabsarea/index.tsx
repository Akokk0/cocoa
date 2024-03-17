import React from "react";
import { createRoot } from "react-dom/client";
import FreshHomeCategories from "./tab";

const rootElement = document.getElementById("root");
//@ts-ignore
const root = createRoot(rootElement);

root.render(
    <FreshHomeCategories />
);
