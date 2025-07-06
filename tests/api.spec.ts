import { test, expect } from "@playwright/test";

test.describe("API Tests", () => {
  test.describe("Posts Resource Tests", () => {
    test.describe("GET Requests", () => {
      test("should get a single resource", async ({ request }) => {
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

      test("should get all posts", async ({ request }) => {
        const requestDate = new Date();
        const response = await request.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBe(100);

        // Validate first post structure
        const firstPost = responseBody[0];
        expect(firstPost).toHaveProperty("userId");
        expect(firstPost).toHaveProperty("id");
        expect(firstPost).toHaveProperty("title");
        expect(firstPost).toHaveProperty("body");

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });

      test("should get posts by userId filter", async ({ request }) => {
        const requestDate = new Date();
        const response = await request.get(
          "https://jsonplaceholder.typicode.com/posts?userId=1"
        );
        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);

        // Validate that all posts belong to userId 1
        responseBody.forEach((post: any) => {
          expect(post.userId).toBe(1);
        });

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });

      test("should get nested comments for a post", async ({ request }) => {
        const requestDate = new Date();
        const response = await request.get(
          "https://jsonplaceholder.typicode.com/posts/1/comments"
        );
        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);

        // Validate comment structure
        const firstComment = responseBody[0];
        expect(firstComment).toHaveProperty("postId");
        expect(firstComment).toHaveProperty("id");
        expect(firstComment).toHaveProperty("name");
        expect(firstComment).toHaveProperty("email");
        expect(firstComment).toHaveProperty("body");
        expect(firstComment.postId).toBe(1);

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });
    });

    test.describe("POST Requests", () => {
      test("should create a new post", async ({ request }) => {
        const requestDate = new Date();

        const newPost = {
          title: "Test Post Title",
          body: "Test post body content",
          userId: 1,
        };

        const response = await request.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            data: newPost,
          }
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(201);

        // Check response body
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("id");
        expect(responseBody.id).toBe(101);
        expect(responseBody.title).toBe(newPost.title);
        expect(responseBody.body).toBe(newPost.body);
        expect(responseBody.userId).toBe(newPost.userId);

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });

      test("should create a post with empty data", async ({ request }) => {
        const requestDate = new Date();

        const response = await request.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            data: {},
          }
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(201);

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });
    });

    test.describe("PUT Requests", () => {
      test("should update post", async ({ request }) => {
        const requestDate = new Date();

        const updatedPost = {
          id: 1,
          title: "Updated Post Title",
          body: "Updated post body content",
          userId: 1,
        };

        const response = await request.put(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            data: updatedPost,
          }
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBe(updatedPost.title);
        expect(responseBody.body).toBe(updatedPost.body);
        expect(responseBody.userId).toBe(updatedPost.userId);

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });
    });

    test.describe("PATCH Requests", () => {
      test("should patch a post", async ({ request }) => {
        const requestDate = new Date();

        const partialUpdate = {
          title: "Partially Updated Title",
        };

        const response = await request.patch(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            data: partialUpdate,
          }
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBe(partialUpdate.title);
        expect(responseBody).toHaveProperty("body");
        expect(responseBody).toHaveProperty("userId");

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });

      test("should patch multiple fields", async ({ request }) => {
        const requestDate = new Date();

        const partialUpdate = {
          title: "New Title",
          body: "New Body Content",
        };

        const response = await request.patch(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            data: partialUpdate,
          }
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response body
        const responseBody = await response.json();
        expect(responseBody.title).toBe(partialUpdate.title);
        expect(responseBody.body).toBe(partialUpdate.body);
        expect(responseBody).toHaveProperty("userId");

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });
    });

    test.describe("DELETE Requests", () => {
      test("should delete an existing post", async ({ request }) => {
        const requestDate = new Date();

        const response = await request.delete(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        const responseDate = new Date();

        // Check status code
        expect(response.status()).toBe(200);

        // Check response time
        const responseTime = responseDate.getTime() - requestDate.getTime();
        expect(responseTime).toBeLessThan(10000);
      });
    });
  });
});
