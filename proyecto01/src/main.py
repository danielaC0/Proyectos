import sys
from lector import cargarImg
from procesador import obtenFig
from clasificador import clasificaFig

def main():
    if len(sys.argv) < 2:
        print("Proporcionar ruta de la imagen .bmp")
        sys.exit(1)

    ruta_imagen = sys.argv[1]
     
    try:
        imagen = cargarImg(ruta_imagen)

        figuras = obtenFig(imagen)

        print(f"\n La imagen se esta procesando: {ruta_imagen}")
        print(f"\n Cantidad de figuras encontradas: {len(figuras)}\n")

        for j, fig in enumerate(figuras, start=1):
            categoria = clasificaFig(fig['contorno'])
            colorHex = fig['colorHex']
            print(f"Figura {j}: Categoria = {categoria}| Color = {colorHex}")

    except Exception as e:
        print(f"Ocurrio un error al ejecutar el programa:\n {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

       
