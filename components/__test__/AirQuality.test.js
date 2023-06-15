import React from 'react';
import { shallow } from "enzyme"
import AirQualityComponent from '../AirQualityComponent';

let wrapped

beforeEach(() => {
    wrapped = shallow(
        <AirQualityComponent />
    )
})
// afterEach(() => {
//     wrapped.unmount()
// })

it("has a h6 tag", () => {
    expect(wrapped.find("h6").length).toEqual(1)
})