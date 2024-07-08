import "./Loading.css";

import img from "../../assets/Icones/LogoPokecatch.png";

const Loading = () => {
  return (
    <div className="loading">
      <img src={img} alt="" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
