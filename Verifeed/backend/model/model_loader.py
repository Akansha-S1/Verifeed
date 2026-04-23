import tensorflow as tf

model = None

def load_model():
    global model

    if model is None:
        print("🔄 Loading CNN model...")
        model = tf.keras.models.load_model("model/model.h5")
        print("✅ Model loaded successfully")

    return model