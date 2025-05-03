import pytest
from selenium.webdriver.edge.service import Service
from selenium import webdriver
from webdriver_manager.microsoft import EdgeChromiumDriverManager

@pytest.fixture(scope="class")
def browser(request):
    # Setup browser with webdriver-manager
    options = webdriver.EdgeOptions()
    options.add_argument("--headless")  # Remove for visible browser
    service = Service(EdgeChromiumDriverManager().install())
    driver = webdriver.Edge(service=service, options=options)

    request.cls.driver = driver
    yield driver
    driver.quit()