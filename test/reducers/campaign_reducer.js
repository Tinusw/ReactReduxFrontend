import { expect } from "../test_helper";
import reducer from "../../src/reducers/campaign_reducer";
import { FETCH_CAMPAIGNS } from "../../src/actions/types";

describe("Campaign reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).to.eql({});
  });

  it("should handle FETCH_CAMPAIGNS", () => {
    let success_response = [
      { id: 1, name: "test1" },
      { id: 2, name: "test1" },
      { id: 3, name: "test1" }
    ];

    expect(
      reducer(
        {},
        {
          type: FETCH_CAMPAIGNS,
          payload: success_response
        }
      )
    ).to.eql({
      collection: [
        { id: 1, name: "test1" },
        { id: 2, name: "test1" },
        { id: 3, name: "test1" }
      ]
    });
  });
});
