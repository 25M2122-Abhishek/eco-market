import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


def scrape_products():
    url = "https://ecoyaan.com/collections/beauty-and-personal-care?CategoryId=3"

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)
    time.sleep(5)

    # Scroll to load all products
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    # Product cards are: <div class="relative flex flex-col ... productCard">
    product_cards = driver.find_elements(By.CSS_SELECTOR, "div.productCard")
    print(f"Found {len(product_cards)} products")

    products = []

    for product in product_cards:

        # ---------- TITLE + PRODUCT LINK ----------
        try:
            a_tag = product.find_element(By.CSS_SELECTOR, "a.line-clamp-3")
            title = a_tag.text.strip()
            product_link = a_tag.get_attribute("href")
        except:
            title = None
            product_link = None

        # ---------- SELLING PRICE ----------
        try:
            selling_price = product.find_element(
                By.CSS_SELECTOR,
                "p.flex span.font-semibold"
            ).text.strip()
        except:
            selling_price = None

        # ---------- COST PRICE (striked-through) ----------
        try:
            cost_price = product.find_element(
                By.CSS_SELECTOR,
                "span.line-through"
            ).text.strip()
        except:
            cost_price = None

        # ---------- DISCOUNT ----------
        try:
            discount = product.find_element(
                By.CSS_SELECTOR,
                "span.text-red-700"
            ).text.strip()
        except:
            discount = None

        # ---------- IMAGE URL ----------
        try:
            img_tag = product.find_element(By.CSS_SELECTOR, "img.object-contain")
            img_url = img_tag.get_attribute("src")
        except:
            img_url = None

        products.append({
            "title": title,
            "brand": None,
            "selling_price": selling_price,
            "cost_price": cost_price,
            "img_url": img_url,
            "product_link": product_link,
            "discount": discount,
            "rating": None,
            "description": None,
            "category": None,
            "sub_category": None,
            "seller": "https://ecoyaan.com/",
        })

    driver.quit()
    return products
