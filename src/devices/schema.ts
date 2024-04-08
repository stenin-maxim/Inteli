export const defaultSchema = [
  {
    "attr": 1665,
    "canTrigger": true,
    "code": "switch",
    "defaultRecommend": true,
    "editPermission": true,
    "executable": true,
    "extContent": "",
    "iconname": "icon-dp_power2",
    "id": 1,
    "mode": "rw",
    "name": "Switch 1",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 1216,
    "canTrigger": true,
    "code": "fault",
    "defaultRecommend": false,
    "editPermission": true,
    "executable": false,
    "extContent": "",
    "iconname": "icon-baojing",
    "id": 4,
    "mode": "ro",
    "name": "故障上报",
    "property": {
      "label": [
        "low_battery",
        "fault",
        "lack_water",
        "sensor_fault",
        "motor_fault"
      ],
      "type": "bitmap",
      "maxlen": 5
    },
    "type": "obj"
  },
  {
    "attr": 1216,
    "canTrigger": true,
    "code": "battery_percentage",
    "defaultRecommend": false,
    "editPermission": true,
    "executable": false,
    "extContent": "",
    "iconname": "icon-dp_battery",
    "id": 7,
    "mode": "ro",
    "name": "Battery",
    "property": {
      "unit": "",
      "min": 0,
      "max": 101,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "switch_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 101,
    "mode": "rw",
    "name": "Switch 2",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "counter_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 102,
    "mode": "rw",
    "name": "Counter 1",
    "property": {
      "unit": "",
      "min": 0,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "counter_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 103,
    "mode": "rw",
    "name": "Counter 2",
    "property": {
      "unit": "",
      "min": 0,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "counter_3",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 104,
    "mode": "rw",
    "name": "Counter 3",
    "property": {
      "unit": "",
      "min": 0,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "counter_4",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 105,
    "mode": "rw",
    "name": "Counter 4",
    "property": {
      "unit": "",
      "min": 0,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "multiplier_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 106,
    "mode": "rw",
    "name": "Multiplier 1",
    "property": {
      "range": [
        "1",
        "10"
      ],
      "type": "enum"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "multiplier_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 107,
    "mode": "rw",
    "name": "Multiplier 2",
    "property": {
      "range": [
        "1",
        "10"
      ],
      "type": "enum"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "multiplier_3",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 108,
    "mode": "rw",
    "name": "Multiplier 3",
    "property": {
      "range": [
        "1",
        "10"
      ],
      "type": "enum"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "multiplier_4",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 109,
    "mode": "rw",
    "name": "Multiplier 4",
    "property": {
      "range": [
        "1",
        "10"
      ],
      "type": "enum"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "alarm",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 110,
    "mode": "rw",
    "name": "Alarm",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "device_cmd",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 111,
    "mode": "rw",
    "name": "Device cmd",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "cleaning",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 112,
    "mode": "rw",
    "name": "Cleaning",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "journal",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 113,
    "mode": "rw",
    "name": "Journal",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "external_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 114,
    "mode": "rw",
    "name": "External 1",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "external_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 115,
    "mode": "rw",
    "name": "External 2",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "multizone_mode",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 116,
    "mode": "rw",
    "name": "Multizone mode",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "status_counter_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 117,
    "mode": "wr",
    "name": "Status counter 1",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "status_counter_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 118,
    "mode": "wr",
    "name": "Status counter 2",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "status_counter_3",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 119,
    "mode": "wr",
    "name": "Status counter 3",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "status_counter_4",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 120,
    "mode": "wr",
    "name": "Status counter 4",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "radio_search",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 121,
    "mode": "rw",
    "name": "Radio search",
    "property": {
      "type": "bool"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "counter_name",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 122,
    "mode": "rw",
    "name": "Counter name",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "wired_sensor_name_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 123,
    "mode": "rw",
    "name": "Wired sensor name 1",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "wired_sensor_name_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 124,
    "mode": "rw",
    "name": "Wired sensor name 2",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "radio_sensor_name_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 125,
    "mode": "rw",
    "name": "Radio sensor name 1",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "radio_sensor_name_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 126,
    "mode": "rw",
    "name": "Radio sensor name 2",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "radio_sensor_name_3",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 127,
    "mode": "rw",
    "name": "Radio sensor name 3",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "radio_sensor_name_4",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 128,
    "mode": "rw",
    "name": "Radio sensor name 4",
    "property": {
      "type": "string",
      "maxlen": 255
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_1",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 129,
    "mode": "rw",
    "name": "Sensor 1",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_2",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 130,
    "mode": "rw",
    "name": "Sensor 2",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_3",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 131,
    "mode": "rw",
    "name": "Sensor 3",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_4",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 132,
    "mode": "rw",
    "name": "Sensor 4",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_5",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 133,
    "mode": "rw",
    "name": "Sensor 5",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_6",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 134,
    "mode": "rw",
    "name": "Sensor 6",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_7",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 135,
    "mode": "rw",
    "name": "Sensor 7",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_8",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 136,
    "mode": "rw",
    "name": "Sensor 8",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_9",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 137,
    "mode": "rw",
    "name": "Sensor 9",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_10",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 138,
    "mode": "rw",
    "name": "Sensor 10",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_11",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 139,
    "mode": "rw",
    "name": "Sensor 11",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_12",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 140,
    "mode": "rw",
    "name": "Sensor 12",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_13",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 141,
    "mode": "rw",
    "name": "Sensor 13",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_14",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 142,
    "mode": "rw",
    "name": "Sensor 14",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_15",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 143,
    "mode": "rw",
    "name": "Sensor 15",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_16",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 144,
    "mode": "rw",
    "name": "Sensor 16",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_17",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 145,
    "mode": "rw",
    "name": "Sensor 17",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_18",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 146,
    "mode": "rw",
    "name": "Sensor 18",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  },
  {
    "attr": 0,
    "canTrigger": true,
    "code": "sensor_19",
    "defaultRecommend": false,
    "editPermission": false,
    "executable": true,
    "extContent": "",
    "id": 147,
    "mode": "rw",
    "name": "Sensor 19",
    "property": {
      "unit": "",
      "min": -2147483647,
      "max": 2147483647,
      "scale": 0,
      "step": 1,
      "type": "value"
    },
    "type": "obj"
  }
]