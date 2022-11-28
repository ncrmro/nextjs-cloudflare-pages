import test from "../fixtures";

test.describe.configure({ mode: "parallel" });

test("viewer can create post", async ({ page }) => {
  await page.goto("/posts/create");
  await page.locator('[placeholder="Title"]').fill("My first test title");
  await page
    .locator('[placeholder="Content"]')
    .fill("# Hello World\nThis is a test post");
  await page.locator("button", { hasText: "Preview" }).click();
  await page.waitForURL("/posts/create?preview=true");
  await page.locator("h1", { hasText: "Hello World" }).waitFor();
});
