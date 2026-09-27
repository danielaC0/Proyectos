#Separar las figuras del fondo y obtener sus propiedades

#Dada una figura, calcula el color de los pixeles en su interior
#Devuelve el valor de los pixeles en formato hexadecimal
def extraerColorHex(imagen_bgr:np.ndarray,contorno) -> str:

#Identifica el color del fondo y crea una mascar para aislar las figuras de color solido
#cv2.findContours se utiliza para obtener contornos de los objetos detectados
#Devolvemos la informacion de cada objeto detectado
    def obtenFig(imagen_bgr:n.ndarray) -> list:

