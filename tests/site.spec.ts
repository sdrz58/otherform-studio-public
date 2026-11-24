import { test, expect, type Page } from "@playwright/test";

test.describe.configure({ mode: "serial" });

function monitor(page: Page) {
  const errors: string[] = [];
  const missing: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() === 404) missing.push(response.url());
  });
  return { errors, missing };
}

async function finishLoading(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("status", { name: /Loading website/ })).toHaveCount(0, { timeout: 30000 });
}

test("desktop experience, interactions, SEO, and runtime health", async ({ page }, testInfo) => {
  const { errors, missing } = monitor(page);
  await finishLoading(page);

  await expect(page).toHaveTitle(/OTHER\/FORM/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /independent creative studio/);
  await expect(page.locator("canvas").first()).toBeVisible();
  await expect.poll(() => page.locator("canvas").first().evaluate((canvas: HTMLCanvasElement) => Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))), { timeout: 30000 }).toBe(true);

  await page.screenshot({ path: "test-results/otherform-desktop.png", fullPage: false, timeout: 60000 });

  const fps = await page.evaluate(() => new Promise<number>((resolve) => {
    let frames = 0;
    const start = performance.now();
    const tick = (now: number) => {
      frames += 1;
      if (now - start >= 2000) resolve((frames * 1000) / (now - start));
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  const resources = await page.evaluate(() => {
    const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return { requests: entries.length, transferBytes: entries.reduce((sum, entry) => sum + entry.transferSize, 0) };
  });
  await testInfo.attach("performance", { body: JSON.stringify({ headlessSoftwareWebglFps: fps, ...resources }, null, 2), contentType: "application/json" });

  await page.getByRole("button", { name: "Next project" }).click();
  await expect(page.getByText("02 / 04", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "View Relay Financial case study" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("heading", { name: "Relay Financial" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.getByRole("button", { name: "Previous project" }).click();
  await expect(page.getByText("01 / 04", { exact: true })).toBeVisible();

  for (const item of [{ name: "Studio", hash: "#studio" }, { name: "Process", hash: "#process" }, { name: "Playground", hash: "#playground" }, { name: "Work", hash: "#work" }]) {
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: item.name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${item.hash}$`));
  }

  await page.getByRole("button", { name: /Identity systems/ }).click();
  await expect(page.getByText("Distinctive brands built to move.")).toBeVisible();

  await page.getByRole("slider", { name: "Particle energy" }).focus();
  await page.keyboard.press("End");
  await expect(page.locator('output[for="energy-slider"]')).toHaveText("100%");
  await page.getByRole("slider", { name: "Particle density" }).focus();
  await page.keyboard.press("Home");
  await expect(page.locator('output[for="density-slider"]')).toHaveText("20%");
  await page.getByRole("button", { name: "Pause field" }).click();
  await expect(page.getByRole("button", { name: "Resume field" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Resume field" }).click();

  await page.getByLabel("Your name *").fill("Melvyn Test");
  await page.getByLabel("Email address *").fill("melvyn@example.com");
  await page.getByLabel("Company").fill("Independent");
  await page.getByLabel("What are we making? *").selectOption({ label: "Digital flagship" });
  await page.getByLabel("Indicative budget *").selectOption({ label: "€30k—€60k" });
  await page.getByLabel("The interesting part *").fill("A complete interactive launch experience for a new creative technology platform.");
  await page.getByRole("button", { name: "Prepare project brief" }).click();
  await expect(page.getByText("Your brief is ready.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveAttribute("href", /^mailto:hello@otherform\.studio/);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.locator('span.sr-only[aria-live="polite"]')).toHaveText("Email address copied to clipboard");

  const robots = await page.request.get("/robots.txt");
  const sitemap = await page.request.get("/sitemap.xml");
  expect(robots.status()).toBe(200);
  expect(sitemap.status()).toBe(200);
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});

test("mobile layout and navigation remain usable at 375px", async ({ page }) => {
  const { errors, missing } = monitor(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await finishLoading(page);
  await page.screenshot({ path: "test-results/otherform-mobile.png", fullPage: false, timeout: 60000 });

  const overflow = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.width + 1);

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Work/ }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/#work$/);

  await page.getByRole("button", { name: "View Aster Intelligence case study" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.waitForTimeout(350);
  await page.screenshot({ path: "test-results/otherform-mobile-dialog.png", fullPage: false, timeout: 60000 });
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: "Prepare project brief" })).toBeVisible();
  await page.screenshot({ path: "test-results/otherform-mobile-contact.png", fullPage: false, timeout: 60000 });
  await page.screenshot({ path: "test-results/otherform-mobile-full.jpeg", type: "jpeg", quality: 70, fullPage: true, timeout: 60000 });
  const finalOverflow = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(finalOverflow.scrollWidth).toBeLessThanOrEqual(finalOverflow.width + 1);
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});

test("reduced motion disables loader and ambient controls without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await finishLoading(page);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.locator("#playground").scrollIntoViewIfNeeded();
  await expect(page.getByText("Static mode respects your reduced-motion preference.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause field" })).toBeDisabled();
  await page.screenshot({ path: "test-results/otherform-reduced-motion.png", fullPage: false, timeout: 60000 });
});


test("tablet and small desktop layouts avoid horizontal overflow", async ({ page }) => {
  await finishLoading(page);
  for (const viewport of [{ width: 768, height: 1024 }, { width: 1024, height: 768 }]) {
    await page.setViewportSize(viewport);
    await page.locator("#playground").scrollIntoViewIfNeeded();
    const dimensions = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 1);
    await page.screenshot({ path: `test-results/otherform-${viewport.width}.png`, fullPage: false, timeout: 60000 });
  }
});
