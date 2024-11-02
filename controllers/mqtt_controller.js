import mqtt from "mqtt";
import { credSend, logging, open_door } from "./esp_controller.js";

const url = "mqtt://mqtt.eclipseprojects.io";
// Initialize MQTT client
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: "emqx_test",
};
export const client = mqtt.connect(url, options);

client.on("connect", function () {
  console.log("Connected");
  // Subscribe to a topic
  client.subscribe("smartLock/server", function (err) {
    if (!err) {
      // Publish a message to a topic
      console.log("Subscribed to smartLock/server");
    }
  });
});

client.on("message", function (topic, payload, packet) {
  // Payload is Buffer
  var data = payload.toString();
  console.log(`Topic: ${topic}, Message: ${data}, QoS: ${packet.qos}`);
  try {
    data = JSON.parse(data);
    if (data.why == "creds") {
      console.log("Creds requested");
      credSend();
    }

    if (data.why == "log") {
      console.log("adding logs to table");
      console.log(data);
      logging(data);
    }

    if (data.why == "new") {
      console.log("New user added");
      console.log(data);
      create_data(data, "auth_users");
    }
  } catch (e) {
    console.log("Received non-JSON message");
    console.log(data);
  }
});
