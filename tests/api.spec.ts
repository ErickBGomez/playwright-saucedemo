import { test, expect } from "@playwright/test";

test.describe("API Tests", () => {
  test.describe("Posts Resource Tests", () => {
    test.describe("GET Requests", () => {
      test("should validate GET request to JSONPlaceholder", async ({
        request,
      }) => {
        // Make request and register request and response time
        const requestDate = new Date();

        const response = await request.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();

        // Validate response structure and content and values
        expect(responseBody).toHaveProperty("userId");
        expect(responseBody).toHaveProperty("id");
        expect(responseBody).toHaveProperty("title");
        expect(responseBody).toHaveProperty("body");

        expect(responseBody.id).toBe(1);
        expect(responseBody.userId).toBe(1);

        //  Check response time
        // Approach found in a comment issue on GitHub
        // https://github.com/microsoft/playwright/issues/19621#issuecomment-1441897305
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000); // 10 seconds
      });
    });
  });
});
