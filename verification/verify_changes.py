from playwright.sync_api import sync_playwright, expect

def verify_site_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Home Page Content
        page.goto("http://localhost:8080")

        # Verify Hero Headline
        expect(page.get_by_text("Stop Running Your Business on Email, Spreadsheets, and \"I Think So.\"")).to_be_visible()

        # Verify Problem Grid Title
        expect(page.get_by_text("The Invisible Drag")).to_be_visible()

        # Verify Solution Section
        expect(page.get_by_text("Centralized Intake")).to_be_visible()
        expect(page.get_by_text("Single Source of Truth")).to_be_visible()

        # Verify CTA button text
        expect(page.get_by_role("link", name="Get My Friction Score").first).to_be_visible()

        # Take screenshot of Home Page
        page.screenshot(path="verification/home_page_updated.png", full_page=True)

        # 2. Verify Quiz Interaction
        page.goto("http://localhost:8080/#join")

        # Wait for Quiz to load
        expect(page.get_by_text("How does new work typically enter your team’s workflow?")).to_be_visible()

        # Take screenshot of Quiz Question 1
        page.screenshot(path="verification/quiz_question_1.png")

        # Answer Question 1
        page.click("button:has-text('CHAOS')")

        # Verify Question 2 appears
        expect(page.get_by_text("If you needed to know the status of a critical project right now, how would you find it?")).to_be_visible()

        # 3. Verify Services Page Content
        page.goto("http://localhost:8080/services/")

        # Verify Phases are correct (Text matches new Timeline layout)
        expect(page.get_by_text("The Diagnosis", exact=True)).to_be_visible()
        expect(page.get_by_text("Phase 1")).to_be_visible()

        expect(page.get_by_text("The Blueprint", exact=True)).to_be_visible()
        expect(page.get_by_text("Phase 2")).to_be_visible()

        # Verify Quiz is present on Services page too
        page.goto("http://localhost:8080/services/#join")
        expect(page.get_by_text("How does new work typically enter your team’s workflow?")).to_be_visible()

        # Take screenshot of Services Page
        page.screenshot(path="verification/services_page.png")

        browser.close()

if __name__ == "__main__":
    verify_site_changes()