"""
Flask API server to connect React frontend with Python chatbot backend
Run this server to enable the React app to communicate with the chatbot
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the shesafe2 directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'shesafe2'))

from chatbot import SheSafeChatbot

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize chatbot
try:
    chatbot = SheSafeChatbot(dataset_path='shesafe2/dataset.json')
    print("Chatbot initialized successfully")
except Exception as e:
    print(f"Error initializing chatbot: {e}")
    chatbot = None

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages from React frontend"""
    if not chatbot:
        return jsonify({
            'response': "Chatbot service is currently unavailable. For immediate help, please call 112 (Emergency) or 181 (Women Helpline)."
        }), 500
    
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Get response from chatbot
        response = chatbot.get_response(user_message)
        
        return jsonify({
            'response': response
        }), 200
        
    except Exception as e:
        print(f"Error processing chat: {e}")
        return jsonify({
            'response': "I'm having trouble processing your request right now. For immediate help, please call 112 (Emergency) or 181 (Women Helpline)."
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'chatbot_loaded': chatbot is not None
    }), 200

if __name__ == '__main__':
    print("Starting SheSafe API server...")
    print("API will be available at http://localhost:5000")
    print("Make sure your React app is configured to use this endpoint")
    app.run(debug=True, port=5000)

