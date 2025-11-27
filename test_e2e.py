import requests
import time
import json

API_URL = "http://localhost:8000/api/v1"

def run_simulation_step():
    print("Triggering Simulation Step...")
    try:
        response = requests.post(f"{API_URL}/simulate/step")
        if response.status_code == 200:
            print("Simulation Step Success:")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Connection Error: {e}")

def check_campaigns():
    print("Checking Campaigns...")
    try:
        response = requests.get(f"{API_URL}/campaigns")
        campaigns = response.json()
        print(f"Found {len(campaigns)} campaigns.")
        for c in campaigns:
            print(f"- {c['name']} [{c['status']}] Budget: ${c['budget']}")
    except Exception as e:
        print(f"Error fetching campaigns: {e}")

def main():
    print("Starting End-to-End Test for TescoSense...")
    
    # Run a few steps to simulate the lifecycle
    for i in range(5):
        print(f"\n--- Step {i+1} ---")
        run_simulation_step()
        time.sleep(1)
        check_campaigns()
        time.sleep(1)

if __name__ == "__main__":
    main()
