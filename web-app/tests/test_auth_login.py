import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures("browser")
class TestLogin:
    LOGIN_URL = "http://localhost:5173/auth/login"
    VALID_EMAIL = "ashan@gmail.com"
    VALID_PASSWORD = "ashan1234"
    INVALID_EMAIL = "wrong@example.com"
    INVALID_PASSWORD = "wrongpassword"
    EDGE_DRIVER_PATH = r'D:\softwares\edgedriver\msedgedriver.exe'

    def __init__(self):
        self.service = Service(self.EDGE_DRIVER_PATH)
        self.driver = webdriver.Edge(service=self.service)

    def test_invalid_credentials(self):
        self.driver.get(self.LOGIN_URL)
        wait = WebDriverWait(self.driver, 10)

        email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email.send_keys(self.INVALID_EMAIL)

        self.driver.find_element(By.ID, "password").send_keys(self.INVALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        error = wait.until(EC.visibility_of_element_located((By.ID, "error-alert")))
        assert "Invalid email or password" in error.text
        assert "login" in self.driver.current_url.lower()

    def test_valid_credentials(self):
        self.driver.get(self.LOGIN_URL)
        wait = WebDriverWait(self.driver, 10)

        email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email.send_keys(self.VALID_EMAIL)

        self.driver.find_element(By.ID, "password").send_keys(self.VALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        wait.until(EC.url_contains("dashboard"))
        assert "dashboard" in self.driver.current_url.lower()