import requests
import json

class listLoader:
    def getStandartURL(self, selectedURL):
        try:
            r = requests.get(url=selectedURL, timeout=5)
            r.raise_for_status()
            
            content_type = r.headers.get('Content-Type', '')
            if 'application/json' not in content_type:
                print(f"Warning: URL {selectedURL} did not return JSON content-type: {content_type}")
                return []
            
            data = r.json()
            
            if not isinstance(data, list):
                print(f"Warning: URL {selectedURL} did not return a list, got {type(data)}")
                return []
            
            return data
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching URL {selectedURL}: {e}")
            return []
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from {selectedURL}: {e}")
            return []
        except Exception as e:
            print(f"Unexpected error loading from {selectedURL}: {e}")
            return []
    
    def getUserPrompts(self, selectedURL, userID):
        try:
            url_with_user_id = selectedURL.replace("userId", str(userID))
            r = requests.get(url=url_with_user_id, timeout=5)
            r.raise_for_status()
            
            content_type = r.headers.get('Content-Type', '')
            if 'application/json' not in content_type:
                print(f"Warning: URL {url_with_user_id} did not return JSON content-type: {content_type}")
                return []
            
            data = r.json()
            
            if not isinstance(data, list):
                print(f"Warning: URL {url_with_user_id} did not return a list, got {type(data)}")
                return []
            
            return data
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching URL {url_with_user_id}: {e}")
            return []
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from {url_with_user_id}: {e}")
            return []
        except Exception as e:
            print(f"Unexpected error loading from {url_with_user_id}: {e}")
            return []