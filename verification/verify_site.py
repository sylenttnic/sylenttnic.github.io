from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8080")

        # Take a screenshot of the top of the page
        page.screenshot(path="verification/home_top.png")

        # Scroll down to testimonials and take a screenshot
        page.locator("#testimonials").scroll_into_view_if_needed()
        page.wait_for_timeout(1000) # Wait for carousel to potentially settle/load
        page.screenshot(path="verification/home_testimonials.png")

        # Scroll to join form and take a screenshot
        page.locator("#join").scroll_into_view_if_needed()
        page.screenshot(path="verification/home_join.png")

        browser.close()

if __name__ == "__main__":
    run()
