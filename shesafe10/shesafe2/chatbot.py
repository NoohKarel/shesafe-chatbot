import json
import random
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from langdetect import detect
from googletrans import Translator


class SheSafeChatbot:
    def __init__(self, dataset_path="dataset.json"):
        # Debug: Print dataset file path
        import os
        abs_path = os.path.abspath(dataset_path)
        print(f"[DEBUG] Loading dataset from: {abs_path}")
        
        with open(dataset_path, "r", encoding="utf-8") as f:
            self.data = json.load(f)
        
        # Debug: Print total entries loaded
        print(f"[DEBUG] Total entries in dataset: {len(self.data)}")

        self.translator = Translator()
        
        # Emergency keywords for immediate help detection
        self.emergency_keywords = [
            "help", "emergency", "danger", "attack", "rape", "abuse", "harass",
            "stalking", "threat", "unsafe", "dangerous", "call police", "need help",
            "someone following", "being followed", "immediate", "urgent", "sos"
        ]

        self.patterns = []
        self.responses = []
        self.languages = []
        self.intents = []
        self.patterns_en = []  # English translations for better matching
        
        # Use a set to track unique question-answer pairs
        seen_questions = set()

        for item in self.data:
            # Handle both old format (patterns/responses) and new format (question/answer)
            if "patterns" in item:
                for p in item["patterns"]:
                    cleaned_p = self.clean_text(p)
                    if cleaned_p not in seen_questions:
                        self.patterns.append(cleaned_p)
                        self.responses.append(item["responses"])
                        self.languages.append(item.get("language", "english"))
                        self.intents.append(item.get("intent", "general"))
                        # Translate to English for better matching
                        self.patterns_en.append(self.translate_to_english(p))
                        seen_questions.add(cleaned_p)
            elif "question" in item and "answer" in item:
                # Clean question text (remove numbers in parentheses)
                cleaned_q = self.clean_text(item["question"])
                language = item.get("language", "english")
                intent = item.get("intent", "general")
                if cleaned_q not in seen_questions:
                    self.patterns.append(cleaned_q)
                    self.responses.append([item["answer"]])
                    self.languages.append(language)
                    self.intents.append(intent)
                    # Translate to English for better matching
                    self.patterns_en.append(self.translate_to_english(item["question"]))
                    seen_questions.add(cleaned_q)
        
        print(f"[DEBUG] Unique patterns loaded: {len(self.patterns)}")
        print(f"[DEBUG] Dataset initialization complete")

        if len(self.patterns) == 0:
            raise ValueError("No valid patterns found in dataset")
            
        # Use multilingual vectorizer - no stop words to support Hindi/Hinglish
        self.vectorizer = TfidfVectorizer(
            lowercase=True, 
            ngram_range=(1, 3),
            min_df=1,
            max_df=0.95,
            sublinear_tf=True
        )
        # Fit on both original and English-translated patterns
        all_patterns = self.patterns + self.patterns_en
        self.X = self.vectorizer.fit_transform(all_patterns)
        
    def clean_text(self, text):
        """Remove numbers in parentheses, extra whitespace, and normalize Hinglish"""
        text = re.sub(r'\s*\(\d+\)\s*', '', text)  # Remove (0), (1), etc.
        text = re.sub(r'[^\w\s]', ' ', text)  # Remove punctuation
        text = re.sub(r'\s+', ' ', text).strip()  # Normalize whitespace
        # Common Hinglish variations normalization
        text = text.lower()
        return text
    
    def preprocess_input(self, text):
        """Advanced preprocessing for user input"""
        # Step 1: Clean text
        cleaned = self.clean_text(text)
        
        # Step 2: Detect language
        detected_lang = self.detect_language(text)
        is_hindi_hinglish = detected_lang in ['hindi', 'hinglish']
        
        # Step 3: Translate ONLY if Hindi/Hinglish
        if is_hindi_hinglish:
            translated = self.translate_to_english(text)
            translated_cleaned = self.clean_text(translated)
        else:
            # For English, use the original text as translation too
            translated_cleaned = cleaned
        
        return cleaned, translated_cleaned

    def translate_to_english(self, text):
        """Translate non-English text to English for better matching"""
        try:
            # Detect language
            lang = detect(text)
            
            # If already English or proper noun, return as is
            if lang == "en":
                return text
            
            # Translate Hindi/Hinglish to English
            translation = self.translator.translate(text, dest="en")
            return translation.text
        except Exception as e:
            # Return original text if translation fails
            return text
    
    def detect_language(self, text):
        """Detect if text is Hindi/Hinglish or English with better accuracy"""
        # Check for common Hindi/Hinglish words first
        hinglish_markers = [
            'hai', 'ho', 'hun', 'hain', 'mera', 'meri', 'mere', 'tujhe', 'mujhe', 
            'ko', 'se', 'par', 'pe', 'mein', 'me', 'ka', 'ki', 'ke', 'kya', 'kaise', 
            'kahan', 'kab', 'kyun', 'rah', 'raha', 'rahi', 'karte', 'karta', 'karti', 
            'tha', 'thi', 'the', 'kar', 'karke', 'karne', 'karna', 'lena', 'dena', 
            'chahiye', 'sakta', 'sakti', 'hoti', 'hota', 'hote', 'hu', 'he', 'haan', 
            'nahi', 'nai', 'ni', 'are', 'yaar', 'bhai', 'didi', 'behen', 'boss'
        ]
        
        # Common English pronouns and articles that should NOT be counted as Hinglish
        english_markers = ['i am', 'you are', 'he is', 'she is', 'it is', 'we are', 'they are', 
                          'the ', ' a ', ' an ', 'my ', 'your ', 'his ', 'her ', 'our ', 'their ']
        
        text_lower = text.lower()
        
        # Check if text contains obvious English markers
        is_obviously_english = any(marker in text_lower for marker in english_markers)
        
        # Count Hinglish markers (must be whole words)
        hinglish_count = sum(1 for word in hinglish_markers if f' {word} ' in f' {text_lower} ' or text_lower.endswith(f' {word}') or text_lower.startswith(f'{word} '))
        
        # If obviously English and fewer than 4 Hinglish markers, treat as English
        if is_obviously_english and hinglish_count < 4:
            return 'english'
        
        # If 3 or more Hinglish markers detected, treat as Hinglish
        if hinglish_count >= 3:
            return 'hinglish'
        
        try:
            lang = detect(text)
            if lang in ['hi', 'bn', 'mr', 'gu']:
                return 'hindi'
            elif lang == 'en':
                # Double-check if it's actually Hinglish written in Latin script
                if hinglish_count >= 2:
                    return 'hinglish'
                return 'english'
        except:
            pass
        return 'english'
    
    def check_emergency(self, user_input):
        """Check if user input contains emergency keywords (not informational queries)"""
        user_lower = user_input.lower()
        
        # Skip if asking for information (helpline, number, what is, how to)
        if any(word in user_lower for word in ["what is", "how to", "helpline", "number", "tell me about", "explain"]):
            return False
        
        # Check for urgent emergency keywords
        urgent_keywords = [
            "emergency now", "help now", "immediate help", "urgent help",
            "i am being attacked", "i am being raped", "someone is attacking",
            "i need immediate help", "call police now", "help me now",
            "i am in danger", "i am unsafe", "someone following me right now",
            "being followed now", "help immediately", "emergency situation"
        ]
        
        for phrase in urgent_keywords:
            if phrase in user_lower:
                return True
        
        # Check for very specific emergency scenarios (not informational)
        if ("i am being" in user_lower or "i am in" in user_lower) and \
           any(word in user_lower for word in ["attacked", "raped", "stalked", "harassed", "abused", "danger", "unsafe"]):
            return True
            
        return False

    def get_response(self, user_input):
        # Debug: Print user query
        print(f"\n[DEBUG] User query: '{user_input}'")
        
        # Detect language of user input
        detected_lang = self.detect_language(user_input)
        is_hindi_hinglish = detected_lang in ['hindi', 'hinglish']
        print(f"[DEBUG] Detected language: {detected_lang}")
        
        # Check for emergency keywords first (check in both English and Hindi)
        if self.check_emergency(user_input):
            print(f"[DEBUG] Emergency detected!")
            if is_hindi_hinglish:
                return "EMERGENCY DETECTED! Turant 112 (Emergency) ya 181 (Mahila Helpline) call karein. Safe jagah par jayein aur trusted logon se madad lein."
            else:
                return "EMERGENCY DETECTED! Please call 112 (Emergency) or 181 (Women Helpline) immediately. Stay safe and seek help from nearby authorities or trusted people."
        
        # Preprocess input: get both original and English translation
        user_input_cleaned, user_input_en = self.preprocess_input(user_input)
        print(f"[DEBUG] Cleaned input: '{user_input_cleaned}'")
        print(f"[DEBUG] English translation: '{user_input_en}'")
        
        # Transform both versions
        user_vec_orig = self.vectorizer.transform([user_input_cleaned])
        user_vec_en = self.vectorizer.transform([user_input_en])
        
        # Calculate similarity for both
        similarity_orig = cosine_similarity(user_vec_orig, self.X)
        similarity_en = cosine_similarity(user_vec_en, self.X)
        
        # Combine similarities (take maximum of both)
        similarity = np.maximum(similarity_orig, similarity_en)
        
        # Get top match
        idx = np.argmax(similarity)
        score = float(similarity[0][idx])
        
        # Map to original pattern index
        num_patterns = len(self.patterns)
        orig_idx = idx if idx < num_patterns else idx - num_patterns
        matched_question = self.patterns[orig_idx]
        
        print(f"[DEBUG] Top match score: {score:.4f}")
        print(f"[DEBUG] Matched question: '{matched_question}'")
        print(f"[DEBUG] Matched language: {self.languages[orig_idx]}")
        
        # Find all matches above threshold
        threshold = 0.05  # Increased threshold for better quality matching
        matching_indices = np.where(similarity[0] >= threshold)[0]
        
        print(f"[DEBUG] Number of matches above threshold: {len(matching_indices)}")
        
        # Improved threshold - if similarity is too low, provide general help
        if len(matching_indices) == 0:
         print("[DEBUG] No matches found")
         return "Sorry, I couldn't find an exact answer. Can you rephrase?"

        # Always return best match
        best_response = self.responses[orig_idx]
        return random.choice(best_response)
        
        # Strategy: Match by INTENT first using English translation, then select by language
        
        # Get all matches with their intents and scores
        intent_matches = {}  # intent -> list of (idx, score, lang)
        
        for match_idx in matching_indices:
            orig_match_idx = match_idx if match_idx < num_patterns else match_idx - num_patterns
            match_score = float(similarity[0][match_idx])
            match_lang = self.languages[orig_match_idx] if orig_match_idx < len(self.languages) else 'english'
            match_intent = self.intents[orig_match_idx] if orig_match_idx < len(self.intents) else 'general'
            
            if match_intent not in intent_matches:
                intent_matches[match_intent] = []
            intent_matches[match_intent].append((orig_match_idx, match_score, match_lang))
        
        # Find best intent (highest total score across languages)
        best_intent = None
        best_intent_score = 0
        for intent, matches in intent_matches.items():
            total_score = sum(m[1] for m in matches)
            if total_score > best_intent_score:
                best_intent_score = total_score
                best_intent = intent
        
        print(f"[DEBUG] Best intent: {best_intent} (score: {best_intent_score:.4f})")
        
        # Now select the best match within the best intent based on language preference
        best_idx = None
        best_score = 0
        
        if best_intent and best_intent in intent_matches:
            for idx, score, lang in intent_matches[best_intent]:
                # Apply language preference boost
                if is_hindi_hinglish and lang in ['hinglish', 'hindi']:
                    boosted = score * 3.0
                elif not is_hindi_hinglish and lang == 'english':
                    boosted = score * 2.5
                else:
                    boosted = score * 0.3
                
                if boosted > best_score:
                    best_score = boosted
                    best_idx = idx
        
        # Fallback if no good match found
        if best_idx is None:
            best_idx = orig_idx
        
        # Return the matched response
        if isinstance(self.responses[best_idx], list):
            response = random.choice(self.responses[best_idx])
        else:
            response = self.responses[best_idx]
        
        print(f"[DEBUG] Returning response ({self.languages[best_idx]}): {response[:100]}...")
        
        # Add emergency contact info for safety-related responses
        safety_keywords_in_response = ["harassment", "violence", "abuse", "rape", "stalking", "attack", "assault", "danger"]
        if any(keyword in response.lower() for keyword in safety_keywords_in_response):
            if is_hindi_hinglish:
                response += "\n\nTurant madad ke liye: 112 ya 181 call karein."
            else:
                response += "\n\nRemember: For immediate help, call 112 or 181."
        
        return response
