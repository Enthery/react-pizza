import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#ebebeb"
    foregroundColor="#ecebeb"
  >
    <circle cx="150" cy="122" r="117" />
    <rect x="12" y="265" rx="5" ry="5" width="270" height="26" />
    <rect x="12" y="315" rx="10" ry="10" width="270" height="85" />
    <rect x="12" y="420" rx="25" ry="25" width="90" height="45" />
    <rect x="132" y="420" rx="25" ry="25" width="140" height="45" />
  </ContentLoader>
);

export default Skeleton;
