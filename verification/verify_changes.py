from playwright.sync_api import sync_playwright, expect

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify Home Page
        print("Verifying Home Page...")
        page.goto("http://localhost:8080/index.html")

        # Check Hero
        expect(page.locator("h1.masthead-heading")).to_contain_text("Stop Running Your Business on Email")
        expect(page.locator("h2.masthead-subheading")).to_contain_text("Chaos isn't a strategy")
        expect(page.get_by_role("link", name="Take the \"Friction Score\" Quiz")).to_be_visible()

        # Check Problem Section
        expect(page.locator("#about h2")).to_contain_text("Why does everything feel harder than it needs to be?")
        expect(page.locator("#about")).to_contain_text("The \"Thousand Front Doors\"")

        # Check Solution Section
        expect(page.get_by_text("We Turn \"Chaos\" into a \"System of Work.\"")).to_be_visible()

        # Check CTA
        expect(page.locator("#join h2")).to_contain_text("How much is friction costing you?")
        expect(page.get_by_role("button", name="Take the Quiz & Book Your Call")).to_be_visible()

        page.screenshot(path="verification/home_page.png", full_page=True)

        # Verify Services Page
        print("Verifying Services Page...")
        page.goto("http://localhost:8080/services/index.html")

        # Check Hero
        expect(page.locator("h1.masthead-heading")).to_contain_text("A Structured Path to Order.")

        # Check Phases
        expect(page.get_by_text("1. The Diagnosis")).to_be_visible()
        expect(page.get_by_text("2. The Blueprint")).to_be_visible()
        expect(page.get_by_text("3. The Build")).to_be_visible()
        expect(page.get_by_text("4. The Handoff")).to_be_visible()

        # Check CTA
        expect(page.locator("#join h2")).to_contain_text("Start with the diagnosis.")
        expect(page.get_by_role("button", name="Get My Friction Score")).to_be_visible()

        page.screenshot(path="verification/services_page.png", full_page=True)

        browser.close()
        print("Verification complete. Screenshots saved.")

if __name__ == "__main__":
    verify_changes()
