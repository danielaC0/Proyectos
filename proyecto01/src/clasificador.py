import cv2
import math
# Aplicar las funciones al contorno
# Aplicammos cv2.approxPolyDP para simplificar la forma y contar el numero de lados de la misma
# Reglas:
# 3 vertices -> "T" Triangulo
# 4 vertices -> "C" Cuadrilatero
# Mas de 4 vertices + alta circularidad -> "O" Circulo
#Si C >= 0.85
# Cualquier otra forma -> "x" Otros
#Si C < 0.85
# Devuelve la letra que representa su categoria

def clasificaFig(contorno) -> str:
    perimetro = cv2.arcLenght(contorno, True)
    epsilon = 0.02 * perimetro
    aproximacion = cv2.approxPolyDP(contorno, epsilon,True)

    numVertices = len(aproximacion)

    #Clasificacion por num de verices
    if numVertices == 3:
        return "T"
    elif numVertices == 4:
        return "C"
    else:
        area = cv2.contourArea(contorno)
        if perimetro == 0:
            return "X"
        circularidad =(4 * math.pi * area) / (perimetro ** 2)
        if circularidad >= 0.85:
            return "O"
        else:
            return "X"