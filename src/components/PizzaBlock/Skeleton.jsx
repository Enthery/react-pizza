import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#ebebeb"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="132" cy="122" r="117" />
    <rect x="1" y="265" rx="5" ry="5" width="270" height="26" />
    <rect x="2" y="315" rx="10" ry="10" width="270" height="85" />
    <rect x="4" y="420" rx="25" ry="25" width="90" height="45" />
    <rect x="120" y="420" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
