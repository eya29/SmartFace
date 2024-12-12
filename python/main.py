import cv2
import face_recognition
import pyttsx3
import speech_recognition as sr
import numpy as np
from pymongo import MongoClient
import gridfs
import os
from datetime import datetime

# Configure MongoDB
client = MongoClient('mongodb+srv://eyayounes:1234@cluster0.sjjluct.mongodb.net/reconnaissance') 
db = client["reconnaissance"]
fs = gridfs.GridFS(db)
collection = db["users"]

# Initialize face recognition variables
known_face_encodings = []
known_face_names = []
recognized_names = set() 

def add_image(image_path, fullName):
    """Store image in GridFS and store user info in MongoDB."""
    if not os.path.exists(image_path):
        print(f"Error: Image file {image_path} does not exist.")
        return

    try:
        with open(image_path, 'rb') as image_file:
            data = image_file.read()
            file_id = fs.put(data, filename=fullName)
        
        collection.update_one(
            {'fullName': fullName},
            {'$set': {'image_id': file_id}},
            upsert=True
        )
        print(f"Image {fullName} added to MongoDB.")
    except Exception as e:
        print(f"Error storing image {fullName}: {e}")

def get_image_file(fullName):
    """Retrieve image file from GridFS based on user name."""
    try:
        user = collection.find_one({'fullName': fullName})
        if user and 'image_id' in user:
            file_id = user['image_id']
            file = fs.get(file_id)
            return file.read()
        return Nonepurpo
    except Exception as e:
        print(f"Error retrieving image for {fullName}: {e}")
        return None

def load_faces_from_db():
    """Load face encodings from MongoDB."""
    global known_face_encodings, known_face_names
    try:
        cursor = collection.find({})
        for document in cursor:
            if 'encoding' in document:
                known_face_encodings.append(np.array(document['encoding']))
                known_face_names.append(document['fullName'])
    except Exception as e:
        print(f"Error loading faces from DB: {e}")

def add_face_encoding(fullName, encoding, arrival_date=None, but=None):
    """Add face encoding to MongoDB with arrival date and time."""
    try:
        if arrival_date is None:
            arrival_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  
        
        update_fields = {
            'encoding': encoding.tolist(),
            'arrival_date': arrival_date,
            'role':'visiteur' 
        }
        
        if but is not None:
            update_fields['but'] = but
        
        collection.update_one(
            {'fullName': fullName},
            {'$set': update_fields},
            upsert=True
        )
    # try:
    #     arrival_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  
    #     collection.update_one(
    #         {'name': name},
    #         {'$set': {
    #             'encoding': encoding.tolist(),
    #             'arrival_date': arrival_date
    #             }},
    #         upsert=True
    #     )
    except Exception as e:
        print(f"Error adding face encoding for {fullName}: {e}")

def add_face_encoding_from_image(image_path, fullName):
    """Extract face encoding from image and store it."""
    try:
        image = face_recognition.load_image_file(image_path)
        encoding = face_recognition.face_encodings(image)
        
        if encoding:
            known_face_encodings.append(encoding[0])
            known_face_names.append(fullName)
            add_face_encoding(fullName, encoding[0])
            add_image(image_path, fullName)
        else:
            print(f"No faces found in the image {image_path}")
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")




load_faces_from_db()

add_face_encoding_from_image("assets/sisi.jpg", "Tesnim")
# add_face_encoding_from_image("assets/asma.jpg", "Asma")
# add_face_encoding_from_image("assets/koukou.jpg", "Kaouther")

engine = pyttsx3.init()
recognizer = sr.Recognizer()

# Start video capture
video_capture = cv2.VideoCapture(0)
if not video_capture.isOpened():
    print("Error: Could not open video device.")
    exit()

while True:
    try:
        ret, frame = video_capture.read()
        if not ret:
            print("Error: Could not read frame.")
            continue

        face_locations = face_recognition.face_locations(frame)
        face_encodings = face_recognition.face_encodings(frame, face_locations)
        
        print(f"Detected faces: {len(face_encodings)}")
        
        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            print("Face matches:", matches)
            name = "Unknown"
            arrival_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            role = "unknown"
            
            if True in matches:
                first_match_index = matches.index(True)
                fullName = known_face_names[first_match_index]
                arrival_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
                add_face_encoding(fullName, face_encoding, arrival_date)

                engine.say("Bonjour " + fullName)
                engine.runAndWait()
            else:
                attempts = 0
                recognized_name = False

                while attempts < 3 and not recognized_name:
                    engine.say("Bonjour, comment t'appelles-tu?")
                    engine.runAndWait()
                    
                try:
                    with sr.Microphone() as source:
                        print("Listening for name...")
                        audio = recognizer.listen(source)
                        spoken_name = recognizer.recognize_google(audio, language='fr-FR')
                        print(f"Recognized name: {spoken_name}")
                        fullName = spoken_name
                        role = "visitor"
                        recognized_name = True
        
                        # add_face_encoding(spoken_name, face_encoding, arrival_date)
                        # add_image('path/to/default/image.jpg', spoken_name)  # Update path to a valid image

                        engine.say("Bonjour, " + fullName + ". Pourquoi arrives-tu à notre société ?")
                        engine.runAndWait()

                        print("Listening for the but...")
                        audio = recognizer.listen(source)
                        but = recognizer.recognize_google(audio, language='fr-FR')
                        print(f"but: {but}")

                        #save to mongodb
                        add_face_encoding(fullName, face_encoding, arrival_date, but, role) 
                        add_image(image_path, fullName)  
                         
                        #save the captured frame to a file
                        image_path = f'python/assets/{fullName}.jpg'
                        cv2.imwrite(image_path, frame)
                        
                       
                        
                        recognized_names.append(fullName)
                        known_face_encodings.append(face_encoding)
                        known_face_names.append(spoken_name)
                        
                except sr.UnknownValueError:
                        print("Could not understand the audio")
                        attempts += 1
                except sr.RequestError as e:
                        print(f"Could not request results; {e}")
                        attempts += 1

                if not recognized_name:
                    # After 3 attempts, save as unknown
                    print("No name recognized after 3 attempts. Saving as 'unknown'.")
                    fullName = "Unknown"
                    role = "unknown"
                    
                    #save to mongodb
                    add_face_encoding(fullName, face_encoding, arrival_date, role=role)
                    add_image('python/assets/unknown.jpg', fullName)
                    
                    #save to a file
                    cv2.imwrite('python/assets/unknown.jpg',frame)

            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, fullName, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        cv2.imshow("Video", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    except Exception as e:
        print(f"Error in video capture loop: {e}")
        break

video_capture.release()
cv2.destroyAllWindows()

# Close MongoDB connection
client.close()


