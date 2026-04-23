import tensorflow as tf
from tensorflow.keras import layers, models

def build_model():
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet"  # 🔥 pretrained
    )

    base_model.trainable = False  # freeze

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(64, activation='relu'),
        layers.Dense(1, activation='sigmoid')  # binary
    ])

    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )

    return model

model = build_model()
model.save("model/model.h5")

print("✅ Pretrained MobileNet model saved")