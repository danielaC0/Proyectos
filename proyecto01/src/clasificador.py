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

clasificaFig(contorno) -> str