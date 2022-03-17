import React from "react";
import renderer from "react-test-renderer";
import Checkout from "../src/components/pages/Checkout";

test("Checkout Page renders without problems", () => {
    const component = renderer.create(
        <Checkout/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});