import React from "react";
import GreetingCard from "./GreetingCard";
import Welcome from "./Welcome";
import "../../stylesheet/Home.css";

function Home(props) {
  return (
    <div className="home">
      <Welcome />
      <GreetingCard />
    </div>
  );
}

export default Home;
