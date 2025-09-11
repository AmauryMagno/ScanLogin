import * as faceapi from "face-api.js";

// Função para carregar os modelos necessários do face-api.js
export async function loadModels() {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const MODEL_URL = baseUrl.endsWith('/') ? baseUrl + 'weights' : baseUrl + '/weights';
    console.log("Caminho dos modelos:", MODEL_URL);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}