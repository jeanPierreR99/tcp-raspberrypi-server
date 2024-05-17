# Proyecto de Monitoreo en Tiempo Real con Raspberry Pi y ESP32 ## Descripción

<p>
  Este proyecto consiste en un sistema de monitoreo en tiempo real utilizando
  una Raspberry Pi como servidor central y un ESP32 como dispositivo de
  recolección de datos. El ESP32 puede estar ubicado en cualquier lugar pero en
  la misma red y envía datos al servidor alojado en la Raspberry Pi mediante
  tcp. El servidor, a su vez, transmite estos datos en tiempo real a un cliente
  mediante sockets, y el cliente los muestra en un gráfico utilizando Chart.js.
</p>

## Tecnologías Utilizadas

<ul>
  <li>
    <b>Raspberry Pi</b>: Actúa como servidor central donde se aloja toda la
    aplicación.
  </li>
  <li>
    <b>ESP32</b>: Dispositivo de recolección de datos que se comunica con el
    servidor.
  </li>
  <li><b>Node.js</b>: Entorno de ejecución para JavaScript en el servidor.</li>
  <li>
    <b>Express</b>: Framework para Node.js, utilizado para manejar las
    solicitudes HTTP.
  </li>
  <li>
    <b>Socket.io</b>: Biblioteca para comunicaciones en tiempo real entre el
    servidor y el cliente.
  </li>
  <li><b>HTML</b>: Estructura de las páginas web del cliente.</li>
  <li>
    <b>Tailwind CSS</b>: Framework de CSS para diseñar la interfaz del cliente.
  </li>
  <li>
    <b>Chart.js</b>: Biblioteca de gráficos para visualizar los datos en tiempo
    real.
  </li>
</ul>

## Arquitectura

<div>
<img width="80%" height="500px" src="./src/public/image/Captura desde 2024-05-17 08-18-08.png" alt="">
</div>
<br>
<pre>
   /tcp-connection
   ├── public          # Archivos estáticos (HTML, CSS, JS)
   │   └── index.html     # Lógica del cliente
   ├── src             # Código fuente del servidor
   │   ├── app.js   # Punto de entrada del servidor tcp y http
   │   └── tcp.ino   # codigo del arduino
   ├── package.json    # Dependencias y scripts del proyecto
   └── README.md       # Este archivo
   </pre>

## Instalación ### Requisitos Previos

<ul>
  <li>Raspberry Pi con Node.js y npm instalados.</li>
  <li>ESP32 configurado con el sensor MQ7 y para conectarse a una red Wi-Fi. Código del arduino en la carpeta src.</li>
  <li>Conexión a Internet o a una red local.</li>
</ul>

### Pasos 1. **Clonar el repositorio desde el Raspberry Pi**

### Pasos 2. **Instalación de dependencias**
<ul>
   <li>npm install.</li>
 </ul>

 ### Pasos 3. **Iniciar el proyecto**
<ul>
   <li>npm run dev.</li>
 </ul>