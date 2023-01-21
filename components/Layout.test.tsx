import React from "react";
import { render, screen } from "@testing-library/react";

import Layout from "./Layout";
import Header from "./Header";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Layout />);

    const heading = screen.getByTestId("heading");

    expect(heading).toBeInTheDocument();
  });
});
