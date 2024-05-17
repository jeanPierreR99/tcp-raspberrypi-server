#include <WiFi.h>
#include <WiFiClient.h>

const char* ssid = "****"; //nombre de wi-fi
const char* password = "*******"; //contraseña wi-fi
const char* serverAddress = "1.1.1.1"; //direccion ip de la red del rasbperry
const int serverPort = 3000; // puerto tcp

WiFiClient client;
const int sensorPin = 34;

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println("Conectando a la red WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }

  Serial.println("Conexión WiFi establecida");

  Serial.print("Conectando al servidor ");
  Serial.print(serverAddress);
  Serial.print(":");
  Serial.println(serverPort);

  if (client.connect(serverAddress, serverPort)) {
    Serial.println("Conexión exitosa al servidor en la nube");
  } else {
    Serial.println("Error al conectar al servidor en la nube");
  }
}

void loop() {
  unsigned long currentMillis = millis();
  unsigned long previousMillis = 0;
  
  if (currentMillis - previousMillis >= 2000) {
    
    previousMillis = currentMillis;
    
     int sensorValue = analogRead(sensorPin);
  float voltage = sensorValue * (3.3 / 4095.0);

  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
  Serial.print("Voltage: ");
  Serial.println(voltage);

  sendToServer(sensorValue);
  }

  delay(2000);
}

void sendToServer(int value) {
  int randomNumber = random(90, 600);
  String data = String(value) + "," + String(randomNumber);
  client.print(data);
  Serial.println("Datos enviados: " + data);
}
