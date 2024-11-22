import machine
import time
from umqtt import MQTTClient
import ubinascii
import ujson
from DIYables_MicroPython_Keypad import Keypad


mqtt_server = 'mqtt.eclipseprojects.io'
client_id = ubinascii.hexlify(machine.unique_id())

topicPub = b'smartLock/server'
topicSub = b'smartLock/esp'
client = MQTTClient(client_id, mqtt_server)

NUM_ROWS = 4
NUM_COLS = 4

ROW_PINS = [19, 18, 5, 17]  
COLUMN_PINS = [16, 4, 0, 2] 

KEYMAP = ['1', '2', '3', 'A',
          '4', '5', '6', 'B',
          '7', '8', '9', 'C',
          '*', '0', '#', 'D']

keypad = Keypad(KEYMAP, ROW_PINS, COLUMN_PINS, NUM_ROWS, NUM_COLS)
keypad.set_debounce_time(400) 


creds = ''  


def read_keypad():
    """Scans the keypad and returns the pressed key or None."""
    for i, row in enumerate(row_pins):
        row.value(1)  
        for j, col in enumerate(col_pins):
            if col.value() == 1:  
                time.sleep(0.02)  
                if col.value() == 1:
                    row.value(0)  
                    return KEYS[i][j]
        row.value(0) 
    return None

def recCreds(data):
    """Handles received credentials from MQTT."""
    global creds
    print("Received credentials via MQTT")
    creds = data["uuid"]
    print("Updated creds:", creds)

def recOpen():
    """Handles the 'open' command from MQTT."""
    print("Opening lock via MQTT...")
    

def sub_cb(topic, msg):
    """Callback function for MQTT."""
    if msg != b'None':
        message = msg.decode()
        message = ujson.loads(message)
        if message["why"] == "creds":
            print("Received why == creds")
            recCreds(message["data"])
        elif message["why"] == "open":
            print("Received why == open")
            recOpen()
        print(f"Message received from topic {topic.decode()}: {msg.decode()}")


input_password = ""

def keypad_loop():
    """Handles the keypad logic."""
    global input_password
    n = 0
    input_password = ""
    while (n<4):
        key = keypad.get_key()
        if key:
            print(f"Key pressed: {key}")
            input_password = input_password + key
            n = n + 1
    return input_password



def main():
    global client
    print("Initializing Smart Lock...")
    client.set_callback(sub_cb)
    client.connect()
    client.subscribe(topicSub)
    print("Connected to MQTT Broker. Subscribed to topic.")
    client.publish(topicPub,str('{"why":"creds"}').encode())
    time.sleep(5)
    client.check_msg()
    while True:
        client.check_msg()  
        value = keypad_loop()
        print(value)
        if value in creds:
            print("Door Opening")
            client.publish(topicPub, str('{"why":"log", "uuid": "' + str(value) + '", "access_given":true}').encode())
        else:
            print("wrong code")
            client.publish(topicPub, str('{"why":"log", "uuid": "' + str("0000") + '", "access_given":false}').encode())


main()


