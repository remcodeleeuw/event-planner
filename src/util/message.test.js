import { encodeMessage, generateUrl } from "./message";

describe("Should run message tests", () => {
  it("Should test encoding of message", () => {
    const message = "Hey willem";
    const expectedMessage = "Hey%20willem";

    expect(encodeMessage(message)).toBe(expectedMessage);
  });
})