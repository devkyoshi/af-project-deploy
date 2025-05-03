import unittest
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

class RegionsPageTests(unittest.TestCase):
    EDGE_DRIVER_PATH = r'D:\softwares\edgedriver\msedgedriver.exe'
    BASE_URL = "http://localhost:5173"
    LOGIN_URL = f"{BASE_URL}/auth/login"
    REGIONS_URL = f"{BASE_URL}/regions"

    VALID_EMAIL = "ashan@gmail.com"
    VALID_PASSWORD = "ashan1234"

    @classmethod
    def setUpClass(cls):
        print("\n=== Initializing Test Suite For Region Selection ===")

    def setUp(self):
        print("\nStarting test setup...")
        self.service = Service(self.EDGE_DRIVER_PATH)
        self.driver = webdriver.Edge(service=self.service)
        self.wait = WebDriverWait(self.driver, 15)
        self.actions = ActionChains(self.driver)

        # Login
        print("Navigating to login page...")
        self.driver.get(self.LOGIN_URL)
        print("Entering credentials...")
        self.wait.until(EC.presence_of_element_located((By.ID, "email"))).send_keys(self.VALID_EMAIL)
        self.driver.find_element(By.ID, "password").send_keys(self.VALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
        self.wait.until(EC.url_contains("dashboard"))
        print("Login successful!")

    def tearDown(self):
        print("\nCleaning up test environment...")
        self.driver.quit()
        print("Cleanup complete!")

    def test_select_region_updates_country_cards(self):
        print("\n=== Starting Test: Region Selection Updates Country Cards ===")
        try:
            # Navigate to the region page
            print("Navigating to regions page...")
            self.driver.get(self.REGIONS_URL)

            # Wait for initial cards to load
            print("Waiting for initial country cards...")
            initial_cards = self.wait.until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".ant-card"))
            )
            print(f"Found {len(initial_cards)} initial country cards")

            # Open region selector
            print("Opening region selector...")
            selector_wrapper = self.wait.until(EC.element_to_be_clickable((
                By.XPATH,
                "//input[@id='region-select']/ancestor::div[contains(@class,'ant-select-selector')]"
            )))
            selector_wrapper.click()

            # Wait for dropdown options
            print("Waiting for dropdown options...")
            self.wait.until(
                EC.presence_of_element_located((By.ID, "region-option-europe"))
            )
            print("Dropdown options loaded")

            # Select Europe option
            print("Selecting Europe option...")
            europe_option = self.driver.find_element(By.ID, "region-option-europe")
            self.driver.execute_script("arguments[0].scrollIntoView(true);", europe_option)
            self.driver.execute_script("arguments[0].click();", europe_option)
            print("Europe option selected")

            # Verify selection
            print("Verifying region selection...")
            self.wait.until(
                EC.text_to_be_present_in_element(
                    (By.CSS_SELECTOR, ".ant-select-selection-item"),
                    "Europe"
                )
            )
            print("Region selection confirmed in UI")

            # Wait for content update
            print("Waiting for country cards to update...")
            def cards_updated(driver):
                try:
                    current_cards = driver.find_elements(By.CSS_SELECTOR, ".ant-card")
                    return len(current_cards) > 0 and current_cards != initial_cards
                except:
                    return False
            self.wait.until(cards_updated)
            print("Country cards updated successfully")

            # Verify European countries
            print("Verifying European countries...")
            country_elements = self.driver.find_elements(By.CSS_SELECTOR, ".ant-card h3")
            country_names = [el.text for el in country_elements]
            print(f"Found countries: {country_names}")

            european_countries = {"Germany", "France", "Italy", "Spain", "Ukraine", "Poland"}
            matches = [name for name in country_names if name in european_countries]

            self.assertTrue(len(matches) > 0,
                            f"No European countries found in: {country_names}")
            print("Test completed successfully!")

        except Exception as e:
            print(f"\n!!! Test failed: {str(e)}")
            self.driver.save_screenshot("region_test_failure.png")
            print("Saved failure screenshot: region_test_failure.png")
            raise

if __name__ == "__main__":
    print("\n=== Starting Test Execution ===")
    suite = unittest.TestLoader().loadTestsFromTestCase(RegionsPageTests)
    runner = unittest.TextTestRunner(verbosity=0)
    result = runner.run(suite)

    print("\n=== Test Execution Summary ===")
    print(f"Total Tests Run: {result.testsRun}")
    print(f"Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failed: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")

    if result.wasSuccessful():
        print("\n=== ALL TESTS PASSED SUCCESSFULLY ===")
    else:
        print("\n!!! SOME TESTS DID NOT PASS !!!")