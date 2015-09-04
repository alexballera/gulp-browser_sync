#Modelo Gulp Browser-Sync

Con este modelo un **Front-End** puede trabajar
archivos **HTML-CSS-JS**, de manera sencilla y sin
descargar excesivas dependencias

###Browser-Sync
Con browser-sync logramos:  
1. Levantar un servidor, por defecto en *puerto 3000*  
2. Sincronizar los cambios en **HTML, CSS, JS** y   automáticamente refresca la pantalla

###HTML  
Lo trabajamos en el archivo:  

**app/html.index**  


###SASS
El estilo lo hacemos con **SASS** y automáticamente es compilado y minificado en **CSS**.  
Hacemos los cambios en:  

**app/styles/styles.scss** 

###JavaScript
Igualmente **JS** automáticamente es compilado y minificado y lo trabajamos en el archivo:  

**app/scripts/main.js**  


###Arrancamos
Necesitas tener instalado **node.js** y el modelo descargado en tu computador, una vez detro de la carpeta, ejecutas:  

```sh
$ npm install
$ gulp
```

