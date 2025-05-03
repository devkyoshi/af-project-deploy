import pytest
import uuid
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def generate_random_email():
    return f"testuser_{uuid.uuid4().hex[:8]}@example.com"


@pytest.mark.usefixtures("browser")
class TestRegistration:
    REGISTER_URL = "http://localhost:5173/auth/register"
    VALID_PASSWORD = "securepassword123"
    EXISTING_EMAIL = "ashan@gmail.com"
    EDGE_DRIVER_PATH = r'D:\softwares\edgedriver\msedgedriver.exe'

    def __init__(self):
        self.service = Service(self.EDGE_DRIVER_PATH)
        self.driver = webdriver.Edge(service=self.service)

    def test_valid_registration(self):
        self.driver.get(self.REGISTER_URL)
        wait = WebDriverWait(self.driver, 10)

        random_email = generate_random_email()
        email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email.send_keys(random_email)

        self.driver.find_element(By.ID, "password").send_keys(self.VALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        wait.until(EC.url_contains("dashboard"))
        assert "dashboard" in self.driver.current_url.lower()

    def test_existing_email_registration(self):
        self.driver.get(self.REGISTER_URL)
        wait = WebDriverWait(self.driver, 10)

        email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email.send_keys(self.EXISTING_EMAIL)

        self.driver.find_element(By.ID, "password").send_keys(self.VALID_PASSWORD)
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

        error = wait.until(EC.visibility_of_element_located((By.ID, "error-alert")))
        assert "Email already exists" in error.text
        assert "register" in self.driver.current_url.lower()
