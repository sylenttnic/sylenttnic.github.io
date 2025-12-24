from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify index.html
        page.goto("http://localhost:8080/")

        # Check main landmark
        main_landmark = page.get_by_role("main")
        if main_landmark.count() > 0:
            print("Main landmark found in index.html")
        else:
            print("Main landmark NOT found in index.html")

        # Check a link color to verify new CSS
        # We look for a link and check its color.
        # The 'Services' link in nav might be white due to navbar-dark, let's check a standard link or primary color button
        # There are no standard links in the main content easily accessible without interaction or specific classes.
        # But we changed --bs-primary which affects buttons.
        # "Services We Offer" button uses btn-primary.
        # However, btn-primary background was NOT changed (it is #342e2e), but the link color was.
        # Let's find an element using the pink color. The navbar link hover? No.
        # The "About" section text doesn't have links.
        # The footer links? "Connect".

        # Let's just take a screenshot of the homepage to see if it looks correct (no broken layout).
        page.screenshot(path="verification/index.png")
        print("Screenshot index.png saved.")

        # Verify services/index.html
        page.goto("http://localhost:8080/services/")
        main_landmark_services = page.get_by_role("main")
        if main_landmark_services.count() > 0:
            print("Main landmark found in services/index.html")
        else:
            print("Main landmark NOT found in services/index.html")

        page.screenshot(path="verification/services.png")
        print("Screenshot services.png saved.")

        browser.close()

if __name__ == "__main__":
    verify_changes()
