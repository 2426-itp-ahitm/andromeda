import requests
import json


def send_message(api_key, realm_id, prompt, history, system_prompt):
    url = "https://nexusdev.winkk.ai/streamChat"
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "realm_id": realm_id,
        "prompt": prompt,
        "history": history,
        "system_prompt": system_prompt
    }

    response = requests.post(url, headers=headers, json=payload, stream=True)
    
    if response.status_code == 200:
        full_response = ""
        for line in response.iter_lines():
            if line:
                try:
                    data = line.decode('utf-8').replace("data: ", "")
                    json_data = json.loads(data)
                    full_response += json_data["content"]
                except ValueError:
                    print("Skipping invalid JSON line:", line)
        return full_response
    else:
        print("Request failed with status code:", response.status_code)
        print("Response content:", response.text)
        response.raise_for_status()

if __name__ == "__main__":
    api_key = ""
    realm_id = ""
    prompt = "What is my name ?"
    history = [["user", "Hello!"], ["assistant", "Hi there!"]]
    system_prompt = "your_system_prompt"

    try:
        response = send_message(api_key, realm_id, prompt, history, system_prompt)
        print("Response from GPT:", response)
    except Exception as e:
        print("Error:", e)