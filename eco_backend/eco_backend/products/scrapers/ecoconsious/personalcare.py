import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service


def scrape_products():
    """
    Scrape products from https://ecoconsious.in/collections/personal-care
    and return them as a list of dicts.
    """
    url = "https://ecoconsious.in/collections/personal-care"

    # --- Selenium setup (headless mode for servers) ---
    chrome_options = Options()
    chrome_options.binary_location = "/usr/bin/chromium"
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    service = Service("/usr/bin/chromedriver")
    driver = webdriver.Chrome(service=service, options=chrome_options)

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
        grid = driver.find_element(By.ID, "product-grid")
        product_cards = grid.find_elements(By.TAG_NAME, "li")
    except Exception as e:
        print("Error locating products:", e)
        driver.quit()
        return []

    print(f"Found {len(product_cards)} products on EcoConscious")

    products = []

    for product in product_cards:
        try:
            a_tag = product.find_element(By.CSS_SELECTOR, "a.full-unstyled-link.custom-card-title.custom-card-title-desk")
            title = a_tag.text.strip()
            product_link = a_tag.get_attribute("href")
            if product_link and product_link.startswith("/"):
                product_link = "https://ecoconscious.in" + product_link

            def safe_find(selector):
                try:
                    return product.find_element(By.CSS_SELECTOR, selector).text.strip()
                except:
                    return None

            description = safe_find("p.product_sub_title.product_sub_title_desk")
            selling_price = safe_find("span.amw-price-container")
            cost_price = safe_find("span.amw-com-price-container")
            discount = safe_find("span.discount_container_comb_card")
            rating = safe_find("div.star-container")

            # --- Get image URL ---
            try:
                img_tag = product.find_element(By.CSS_SELECTOR, "img.motion-reduce")
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
                    "seller": "https://ecoconscious.in/",
                }
            )

        except Exception as e:
            print("Error processing product:", e)

    driver.quit()
    return products
