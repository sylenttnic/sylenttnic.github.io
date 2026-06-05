import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def main():
    # Start the server
    process = subprocess.Popen(["npx", "serve", "out", "-l", "3000"])
    time.sleep(5) # Wait for server to start

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Desktop
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(2000) # Wait for animations
        await page.screenshot(path="screenshot_desktop.png", full_page=True)

        # Mobile
        await page.set_viewport_size({"width": 375, "height": 812})
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="screenshot_mobile.png", full_page=True)

        await browser.close()

    process.terminate()

if __name__ == "__main__":
    asyncio.run(main())
