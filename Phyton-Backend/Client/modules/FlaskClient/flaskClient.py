from flask import Flask, request, jsonify
import requests
import os
from urllib.parse import urlparse
import zipfile
from OptionClient import optionManager
from helpers.config import SPEACH_MODULE_PATH, model_state_path
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def download_file():
    print("Received download request")
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'Please provide both "url" '}), 400

    url = data['url']
    path = SPEACH_MODULE_PATH
    print(f"Downloading from {url} to {path}")

    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()

        # Create a temporary file first
        temp_path = os.path.join(os.path.dirname(path), 'temp.zip')
        with open(temp_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        if zipfile.is_zipfile(temp_path):
            path_parsed = urlparse(url).path
            file_name_with_ext = os.path.basename(path_parsed)
            file_name = os.path.splitext(file_name_with_ext)[0]
            extract_path = os.path.join(path, file_name)
            
            if os.path.exists(extract_path):
                os.remove(temp_path)
                return jsonify({'message': 'Module already exists'}), 409
                
            # Extract to the target location
            with zipfile.ZipFile(temp_path, 'r') as zip_ref:
                zip_ref.extractall(extract_path)
            
            with open(model_state_path, 'r') as f:
                model_state = json.load(f)
                model_state["downloaded_modules"].append(file_name)
            
            with open(model_state_path, 'w') as f:
                json.dump(model_state, f, indent=4)
            
            # Clean up temporary file
            os.remove(temp_path)
            return jsonify({'message': f'Zip file downloaded and extracted to {extract_path}'}), 200

        return jsonify({'message': f'File downloaded successfully to {path}'}), 200

    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
    
@app.route('/set_selected_module', methods=['POST'])
def set_selected_module():
    data = request.get_json()
    
    if not data or 'path' not in data:
        return jsonify({'error': 'Please provide a path'}), 400

    if not os.path.exists(SPEACH_MODULE_PATH+"\\"+ data['path']):
        return jsonify({'error': 'The specified path does not exist'}), 404

    try:
        option_manager = optionManager.OptionManager()
        option_manager.set_active_speach_module(data['path'])
        with open(model_state_path, 'r') as f:
            model_state = json.load(f)
            model_state["active_speach_module"] = data['path']
            
        return jsonify({'message': 'Selected module updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def run_flask():
        # Use 0.0.0.0 if you want it accessible from other devices
        app.run(host="localhost", port=65323)
        
if __name__ == '__main__':
    run_flask()