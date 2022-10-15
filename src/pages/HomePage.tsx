import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    HomePage
    <div>
      <button className="bg-blue-800 hover:bg-blue-600 text-white rounded px-4 py-2" type="button">
        <Link to="/game">to game</Link>
      </button>
    </div>
  </div>
);

export default HomePage;
