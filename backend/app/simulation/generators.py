import random
import datetime

def generate_weather_data():
    conditions = ["Sunny", "Rainy", "Cloudy", "Snow", "Heatwave"]
    return {
        "condition": random.choice(conditions),
        "temperature": random.randint(-5, 35),
        "timestamp": datetime.datetime.now().isoformat()
    }

def generate_sales_data(product_category="Soup"):
    base_sales = 100
    noise = random.randint(-20, 50)
    return {
        "category": product_category,
        "sales_volume": base_sales + noise,
        "timestamp": datetime.datetime.now().isoformat()
    }

def generate_trends_data(keyword="Comfort Food"):
    return {
        "keyword": keyword,
        "search_volume_index": random.randint(0, 100),
        "timestamp": datetime.datetime.now().isoformat()
    }
