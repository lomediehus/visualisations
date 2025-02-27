import streamlit as st
import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor
import soundfile as sf
import librosa
import numpy as np

# Check if CUDA is available and set device accordingly
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load the KB Whisper model and processor
model_id = "KBLab/kb-whisper-base"
model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id).to(device)
processor = AutoProcessor.from_pretrained(model_id)

# Streamlit app
st.title("Audio Transcription App")

# File uploader
uploaded_file = st.file_uploader("Upload an audio file", type=["wav", "mp3", "m4a"])

if uploaded_file is not None:
    # Load audio file using soundfile
    audio, sr = sf.read(uploaded_file)  # Load the audio file without specifying the sample rate

    # Resample the audio to 16kHz if necessary
    if sr != 16000:
        audio = librosa.resample(audio, orig_sr=sr, target_sr=16000)

    # Define chunk size and overlap
    chunk_size = 16000 * 30  # 30 seconds
    overlap = 16000 * 5  # 5 seconds

    # Process audio in chunks
    transcriptions = []
    for start in range(0, len(audio), chunk_size - overlap):
        end = min(start + chunk_size, len(audio))
        audio_chunk = audio[start:end]

        # Convert audio chunk to PyTorch tensor
        inputs = processor(audio_chunk, sampling_rate=16000, return_tensors="pt", padding=True, return_attention_mask=True)
        input_features = inputs.input_features.to(device)
        attention_mask = inputs.attention_mask.to(device)

        # Generate transcription for the chunk
        with torch.no_grad():
            predicted_ids = model.generate(input_features, attention_mask=attention_mask, max_length=400)

        # Decode the transcription
        transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
        transcriptions.append(transcription)

    # Combine all transcriptions
    full_transcription = " ".join(transcriptions)
    st.write("Transcription:", full_transcription)

    # Save the transcription to a text file
    output_path = "transcription.txt"
    with open(output_path, "w") as f:
        f.write(full_transcription)

    # Provide download link for the transcribed file
    with open(output_path, "rb") as f:
        st.download_button("Download Transcription", f, file_name="transcription.txt")