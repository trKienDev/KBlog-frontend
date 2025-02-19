import React from "react";
import Header from "../components/Header";

const HomePage: React.FC = () => {
      return (
            <>
                  <Header />
                  <div className="page-container">
                        <main className="homepage-container">
                              <h1 className="homepage-title">
                                    Welcome to my blog
                              </h1>
                        </main>
                  </div>
            </>
      );
};

export default HomePage;