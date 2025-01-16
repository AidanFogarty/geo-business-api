import assert from "node:assert";
import { describe, it } from "node:test";
import { app } from "src/app";

import request from "supertest";

describe("GET /healthcheck", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/healthcheck");
    assert(response.status === 200);
  });

  it("should return status ok in json", async () => {
    const response = await request(app).get("/healthcheck");

    assert(response.body.status === "ok");
  });
});
