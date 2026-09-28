import cv2
import numpy as np

# Separar las figuras del fondo y obtener sus propiedades

# Dada una figura, calcula el color de los pixeles en su interior
# Devuelve el valor de los pixeles en formato hexadecimal
def extraerColorHex(imagen_bgr: np.ndarray, contorno) -> str:
    # Crear una máscara en negro del mismo tamaño espacial que la imagen
    mascaraFig = np.zeros(imagen_bgr.shape[:2], dtype=np.uint8)
    
    cv2.drawContours(mascaraFig, [contorno], -1, 255, thickness=cv2.FILLED)

    # Para obtener el valor RGB promedio de una figura
    bgrPromedio = cv2.mean(imagen_bgr, mask=mascaraFig)[:3]

    # Convertir BGR a RGB
    r = int(bgrPromedio[2])
    g = int(bgrPromedio[1])
    b = int(bgrPromedio[0])
    return f"#{r:02X}{g:02X}{b:02X}"


# Identifica el color del fondo y crea una mascara para aislar las figuras de color solido
# cv2.findContours se utiliza para obtener contornos de los objetos detectados
# Devolvemos la informacion de cada objeto detectado
def obtenFig(imagen_bgr: np.ndarray) -> list:
    colorFondoBGR = imagen_bgr[0, 0]
    mascaraObj = cv2.inRange(imagen_bgr, colorFondoBGR, colorFondoBGR)
    mascaraObj = cv2.bitwise_not(mascaraObj)

    # Encontrar los contornos
    contornos, _ = cv2.findContours(mascaraObj, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    figurasDetectadas = []
    for i in contornos:
        if cv2.contourArea(i) > 50:
            colorHex = extraerColorHex(imagen_bgr, i)
            figurasDetectadas.append({
                'contorno': i,
                'colorHex': colorHex
            })
    return figurasDetectadas