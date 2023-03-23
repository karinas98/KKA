import { useState } from "react";
import { API_URL } from "../consts-data";
const HomePage = () => {
  return (
    <div>
      <section className="home-header">
        <h1 className="headline">
          "Food is our common ground, a universal experience."
        </h1>
        <h2 className="head-author">- James Beard</h2>
      </section>
      <section className="home-body"></section>
    </div>
  );
};
export default HomePage;
