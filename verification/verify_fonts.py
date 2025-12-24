from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8080")
            page.wait_for_load_state("networkidle")
            # Take a screenshot of the top section to verify fonts and layout
            page.screenshot(path="verification/homepage_fonts.png")
            print("Screenshot taken: verification/homepage_fonts.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
