import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


def scrape_products():
    """
    Scrape products from https://ecoyaan.com/collections/beauty-and-personal-care?CategoryId=3
    and return them as a list of dicts.
    """
    url = "https://ecoyaan.com/collections/beauty-and-personal-care?CategoryId=3"

    # --- Selenium setup (headless mode for servers) ---
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    driver = webdriver.Chrome(options=chrome_options)

    driver.get(url)
    time.sleep(5)

    # --- Scroll to load all products ---
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    # --- Get all product elements ---
    try:
        grid = driver.find_element(By.CSS_SELECTOR, "div.grid")
        product_cards = grid.find_elements(By.CSS_SELECTOR, "div.relative")
    except Exception as e:
        print("Error locating products:", e)
        driver.quit()
        return []

    print(f"Found {len(product_cards)} products on Ecoyaan")

    products = []

    for product in product_cards:
        try:
            try:
                a_tag = product.find_element(By.CSS_SELECTOR, "a.line-clamp-3")
                title = a_tag.text.strip()
                product_link = a_tag.get_attribute("href")
                if product_link and product_link.startswith("/"):
                    product_link = "https://ecoyaan.com" + product_link
            except:
                try:
                    a_tag = product.find_element(By.CSS_SELECTOR, "a.line-clamp7")
                    title = a_tag.text.strip()
                    product_link = a_tag.get_attribute("href")
                    if product_link and product_link.startswith("/"):
                        product_link = "https://ecoyaan.com" + product_link
                except:
                    title: None
                    product_link: None
            try:
                description = product.find_element(By.CSS_SELECTOR, "p.product_sub_title.product_sub_title_desk").text.strip()
            except:
                description = None
            try:
                selling_price = product.find_element(By.CSS_SELECTOR, "span.font-semibold").text.strip()
            except:
                selling_price = None

            try:
                cost_price = product.find_element(By.CSS_SELECTOR, "span.line-through").text.strip()
            except:
                cost_price = None

            try:
                discount = product.find_element(By.CSS_SELECTOR, "span.text-red-700").text.strip()
            except:
                discount = None

            try:
                rating = product.find_element(By.CSS_SELECTOR, "div.star-container").text.strip()
            except:
                rating = None

            try:
                img_tag = product.find_element(By.CSS_SELECTOR, "img.w-full")
                img_url = img_tag.get_attribute("srcset")
                if img_url:
                    img_url = img_url.split(",")[-1].split()[0]
                    if img_url.startswith("//"):
                        img_url = "https:" + img_url
                else:
                    img_url = img_tag.get_attribute("src")
                    if img_url.startswith("//"):
                        img_url = "https:" + img_url
            except:
                img_url = None
        
            products.append(
                {
                    "title": title,
                    "brand": None,
                    "selling_price": selling_price,
                    "cost_price": cost_price,
                    "img_url": img_url,
                    "product_link": product_link,
                    "discount": discount,
                    "rating": rating,
                    "description": description,
                    "category": None,
                    "sub_category": None,
                    "seller": "https://ecoyaan.com/",
                }
            )

        except Exception as e:
            print("Error processing product:", e)


    driver.quit()
    return products
