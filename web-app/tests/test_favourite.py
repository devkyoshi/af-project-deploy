import unittest
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

class FavoriteButtonTests(unittest.TestCase):
    EDGE_DRIVER_PATH = r'D:\softwares\edgedriver\msedgedriver.exe'
    BASE_URL = "http://localhost:5173"
    LOGIN_URL = f"{BASE_URL}/auth/login"
    REGIONS_URL = f"{BASE_URL}/regions"
    TEST_COUNTRY = "Japan"  # Update to match your test data
    VALID_EMAIL = "ashan@gmail.com"
    VALID_PASSWORD = "ashan1234"

    @classmethod
    def setUpClass(cls):
        print("\n=== Starting Favorite Button Test Suite ===")

    def setUp(self):
        self.service = Service(self.EDGE_DRIVER_PATH)
        self.driver = webdriver.Edge(service=self.service)
        self.wait = WebDriverWait(self.driver, 20)
        self.actions = ActionChains(self.driver)

        # Login and navigate to regions
        self.driver.get(self.LOGIN_URL)
        self.wait.until(EC.presence_of_element_located((By.ID, "email"))).send_keys(self.VALID_EMAIL)
        self.driver.find_element(By.ID, "password").send_keys(self.VALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()
        self.wait.until(EC.url_contains("dashboard"))

        print("🌍 Navigating to regions page...")
        self.driver.get(self.REGIONS_URL)

        # Ensure test country is visible
        print(f"🔍 Waiting for {self.TEST_COUNTRY} to load...")
        self.wait.until(EC.presence_of_element_located(
            (By.XPATH, f"//h3[contains(., '{self.TEST_COUNTRY}')]")
        ))


    def tearDown(self):
        # Close the browser after each test
        self.driver.quit()

    def get_favorite_button(self):
        btn = self.wait.until(EC.presence_of_element_located(
            (By.XPATH, f"//h3[contains(., '{self.TEST_COUNTRY}')]/following-sibling::button")
        ))
        self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", btn)
        return btn

    def get_favorite_state(self):
        try:
            btn = self.get_favorite_button()
            # Check for filled heart (FaHeart) using SVG path
            is_favorite = len(btn.find_elements(By.XPATH, ".//*[local-name()='path' and contains(@d, 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z')]")) > 0
            return is_favorite
        except Exception as e:
            print(f"❌ Error checking favorite state: {str(e)}")
            return False

    def wait_for_state_change(self, initial_state):
        def state_changed(driver):
            return self.get_favorite_state() != initial_state
        self.wait.until(state_changed)
        print("✅ State change detected!")

    def test_favorite_button_toggle(self):
        print("\n=== Testing Favorite Button Toggle ===")
        try:
            # Get initial state
            initial_state = self.get_favorite_state()

            # Click button
            btn = self.get_favorite_button()
            btn.click()

            # Wait for state change
            self.wait_for_state_change(initial_state)
            new_state = self.get_favorite_state()

            # Assertion
            self.assertNotEqual(initial_state, new_state, "Favorite state did not toggle")
            print("🎉 Toggle test passed!")

        except Exception as e:
            print(f"❌ Toggle test failed: {str(e)}")
            raise

    def test_favorite_persistence_after_reload(self):
        print("\n=== Testing Persistence After Reload ===")
        try:
            # Get initial state
            initial_state = self.get_favorite_state()

            # Toggle state
            btn = self.get_favorite_button()
            btn.click()
            self.wait_for_state_change(initial_state)

            # Reload and verify
            print("🔄 Reloading page...")
            self.driver.refresh()
            self.wait.until(EC.presence_of_element_located(
                (By.XPATH, f"//h3[contains(., '{self.TEST_COUNTRY}')]")
            ))

            print("🔍 Checking persisted state...")
            persisted_state = self.get_favorite_state()
            self.assertNotEqual(initial_state, persisted_state, "State didn't persist")
            print("🎉 Persistence test passed!")

        except Exception as e:
            print(f"❌ Persistence test failed: {str(e)}")
            raise

    def test_multiple_favorite_operations(self):
        print("\n=== Testing Multiple Operations ===")
        try:
            states = []
            for i in range(2):
                print(f"\n🔁 Operation {i+1}/2:")
                current_state = self.get_favorite_state()
                states.append(current_state)

                print("🖱️ Clicking favorite button...")
                btn = self.get_favorite_button()
                btn.click()
                self.wait_for_state_change(current_state)
                time.sleep(1)

            print(f"📊 States recorded: {states}")
            self.assertNotEqual(states[0], states[1], "States should alternate")
            print("🎉 Multiple operations test passed!")

        except Exception as e:
            print(f"❌ Multiple operations test failed: {str(e)}")
            raise

if __name__ == "__main__":
    print("\n=== Starting Test Execution For Favourite Country Toggler===")
    suite = unittest.TestLoader().loadTestsFromTestCase(FavoriteButtonTests)
    runner = unittest.TextTestRunner(verbosity=0)
    result = runner.run(suite)

    print("\n=== Test Execution Summary ===")
    print(f"Total Tests Run: {result.testsRun}")
    print(f"Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failed: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")

    if result.wasSuccessful():
        print("\n🎉=== ALL TESTS PASSED SUCCESSFULLY ===🎉")
    else:
        print("\n❌!!! SOME TESTS DID NOT PASS !!!❌")