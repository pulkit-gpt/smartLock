import mqtt from "mqtt";

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
  client.subscribe("pulkit\\test", function (err) {
    if (!err) {
      // Publish a message to a topic
      client.publish("pulkit\\test", '{"data":123, "test": "help"}');
    }
  });
});

client.on("message", function (topic, payload, packet) {
  // Payload is Buffer
  var data = payload.toString();
  data = JSON.parse(data);
  console.log(
    `Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`
  );
});
