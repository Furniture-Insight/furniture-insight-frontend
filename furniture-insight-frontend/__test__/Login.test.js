import React from "react";
import renderer from "react-test-renderer";
import Login from "../src/components/pages/Login";

test("Checkout Page renders without problems", () => {
    const component = renderer.create(
        <Login/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});