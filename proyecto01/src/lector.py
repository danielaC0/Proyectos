import cv2 
import os
import numpy as np
#Manejar la entrada de los archivos de las imagenes y controlar los errores

#Recibe la ruta del archivo y verifica si es valida, si no lo es muestra un mensaje de error y detiene el programa
#Devuelve la imagen como una matriz de NumPy usando cv2.imread
def cargarImg(ruta_archivo:str) -> np.ndarray:
    if not os.path.exists(ruta_archivo):
        raise FileNotFoundError(f"No se encontro el archivo en la direccion")
    if not ruta_archivo.lower().endswith('.bmp'):
        raise ValueError("La imagen no tiene formato bmp")

    # Cargar la imagen usando opernCV
    imagen = cv2.imread(ruta_archivo)
    if imagen is None:
        raise ValueError("No se pudo leer la figura")

    return imagen