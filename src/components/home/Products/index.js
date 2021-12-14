import React from "react";
import ProductBannerRight from "./ProductBannerRight";
import ProductBannerLeft from "./ProductBannerLeft";
import ProductHeader from "./ProductHeader";
import {
  learnText,
  design,
  create,
  project,
  upload,
  modelList,
  viewModel,
  processFiles,
  downloadProcessPlan,
} from "./ProductsData";
import NavBar from "../NavBar";
import Footer from "../Footer";

const Products = () => {
  return (
    <div id="services">
      <NavBar />
      <ProductHeader {...learnText} />
      <ProductBannerLeft {...design} />
      <ProductBannerRight {...create} />
      <ProductBannerLeft {...project} />
      <ProductBannerRight {...upload} />
      <ProductBannerLeft {...modelList} />
      <ProductBannerRight {...viewModel} />
      <ProductBannerLeft {...processFiles} />
      <ProductBannerRight {...downloadProcessPlan} />
      <Footer />
    </div>
  );
};

export default Products;
