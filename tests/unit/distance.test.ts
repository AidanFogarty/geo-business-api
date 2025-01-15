import { haversineDistance } from "@utils/distance";
import assert from "node:assert";
import { describe, it } from "node:test";

describe("haversineDistance", () => {
  it("should return the distance between two coordinates", () => {
    const distance = haversineDistance(
      { lat: 53.3498, long: 6.2603 }, // Dublin spire
      { lat: 53.3399, long: 6.2633 } // St. Stephen's Green
    );
    assert(distance === 1.12);
  });

  it("should return 0 for the same coordinate", () => {
    const distance = haversineDistance(
      { lat: 53.3498, long: 6.2603 }, // Dublin spire
      { lat: 53.3498, long: 6.2603 } // Dublin spire
    );
    assert(distance === 0);
  });
});
