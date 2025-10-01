# Ejercicio 1

## Unión de dos programas

Lo  que haremos primero es investigar superficialmente como se hace esto solo con la intención de tener menos fallas posibles y ahorrar un poco mas de tiempo. necesitamos saber cosas simples como: 

* Que hace la app 1 y que hace la app2 .
* Que entradas y salidas tiene cada una.
* Que librerías tiene casa una de ellas.



### Identificar puntos de integración.

Un ejemplos sencillo es tomas estas preguntas en cuanta y las iremos contestando en el proceso. 

* ¿Ambas apps usan la misma base de datos? que de echo es muy similar y usaremos mongo atlas.
* ¿Ambas apps usar interfaces similares? De echo son muy similares como la estructura de sus archivos.
* ¿Hay funciones que se repiten? Claro que si son muy similares lo que debes tomar en cuenta es que las debemos reunir en un solo modulo para no duplicarlas.

### Diseñar la estructura de la app fusionada

Debemos tomar en cuenta cómo está construida su estructura, qué carpetas se parecen entre sus carpetas y cuáles podemos meter en la misma carpeta para que se llame de una manera más fácil Teniendo siempre cuidado evitar La duplicidad. 

Pero antes de poner las carpetas necesarias primero voy armar el proyecto desde visual basic sonde comenzare con lo que el profesor me a enseñado con el comando npm init -y para crear todo e ir metiendo todas las librerias que tienen ambas aplicaciones y que podemos visializar en package.json.

Reviso cual tiene mas y comienzo a ponerlas la verdad no are un programa sobre otro are un programa ams y despues le pondre todo ahi. 

Usare el primer ejercicio como la base el porque are esto es por la simplicidad de que tiene mayor material de codigo y por logica sera mas facil.





### Pasos para fusionar

1. Crear la estructura de carpetas.
2. Mover el código de cada app a su carpeta correspondiente.
3. Ajustar importaciones para que funcionen en la nueva estructura.
4. Probar que todo funciona integrado.





