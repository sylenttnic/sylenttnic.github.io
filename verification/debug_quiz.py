from playwright.sync_api import sync_playwright

def debug_quiz():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console logs
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        print("Navigating to http://localhost:8080/#join ...")
        page.goto("http://localhost:8080/#join")

        # Wait a bit to see if execution happens
        page.wait_for_timeout(3000)

        # Check if quiz content is visible
        is_visible = page.locator("text=How does new work typically enter").is_visible()
        print(f"Quiz Question Visible: {is_visible}")

        # Take a screenshot for visual inspection
        page.screenshot(path="verification/debug_quiz.png")

        browser.close()

if __name__ == "__main__":
    debug_quiz()