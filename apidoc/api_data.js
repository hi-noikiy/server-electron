define({ "api": [
  {
    "type": "post",
    "url": "/auth/v1.0/E001-001/checkauth",
    "title": "检测重复",
    "version": "1.0.0",
    "name": "checkauth",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>检测的用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>手机号.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"username\":\"z2c221a11\",\n     \"email\" : \"z1c@qq.com\",\n     \"phone\" : \"134238054731q1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolen",
            "optional": false,
            "field": "success",
            "description": "<p>成功标识.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolen",
            "optional": true,
            "field": "type",
            "description": "<p>是否可用.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"username\": true,\n   \"email\": false,\n   \"phone\": false,\n   \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 ok\n{    \n  \"success\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "servers/controllers/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/auth/v1.0/E001-001/login",
    "title": "请求登陆",
    "version": "1.0.0",
    "name": "login",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type",
            "defaultValue": "0",
            "description": "<p>登陆类型，没有这个类型的时候注册完成时重定向到首页.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登陆账号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登陆密码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n      \"username\":\"zhengchong\",\n\t     \"password\":\"123456\"\n    }",
          "type": "json"
        }
      ]
    },
    "description": "<p>所有的登陆验证都在这个接口进来</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolen",
            "optional": false,
            "field": "success",
            "description": "<p>成功标识.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>token验证.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"access_token\": \"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhNGUzYWYzNTU1NTZmNmVhYzk3ZWQ3ZiIsInVzZXJuYW1lIjoiemhlbmdjaG9uZyIsIm5pY2tuYW1lIjoi6YOR5bSHIn0.EgCt35m9gUjDfOT0Az0gzXx9MBHJnOfYcxTDuDJRbpk\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>password</code> of the password was error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Not Found\n{    \n  \"success\": false\n  \"error\": \"password error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "servers/controllers/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/auth/v1.0/E002-001/offline",
    "title": "下线请求",
    "version": "1.0.0",
    "name": "offline",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"access_token\": \"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhNTQ1OThhNjY2OGRiNjg5MDAwNGE0NSIsInR5cGUiOjEsImVtYWlsIjoiejFjQHFxLmNvbSIsInBob25lIjoiMTM0MjM4MDU0NzMxcTEiLCJ1c2VybmFtZSI6InpoZW5nY2hvbmcxIn0.To6yKntvR2vNQv7eMVfycrSaUeFNWKFg4TLHDWvL6mg\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolen",
            "optional": false,
            "field": "success",
            "description": "<p>成功标识.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 ok\n{    \n  \"success\": false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "servers/controllers/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/auth/v1.0/E001-001/signup[/client]",
    "title": "注册用户",
    "version": "1.0.0",
    "name": "signup",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>登陆账号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>登陆密码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>注册邮箱.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>注册手机.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "type",
            "defaultValue": "0",
            "description": "<p>注册类型. 0 为webpage 注册进来用户 1 为客户端应用注册进来用户 2 为微信用户</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "auth",
            "defaultValue": "0",
            "description": "<p>用户权限.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n     \"username\":\"zhengchong1\",\n        \"password\":\"3444\",\n        \"email\":\"z1c@qq.com\",\n        \"phone\":\"1342380547311\",\n        \"type\":\"client\",\n        \"auth\":[0,2]\n }",
          "type": "json"
        }
      ]
    },
    "description": "<p>所有的登陆验证都在这个接口进来</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolen",
            "optional": false,
            "field": "success",
            "description": "<p>成功标识.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回用户信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "access_token",
            "description": "<p>token验证.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n            \"user_id\": \"5a54434cfadd001fbc3cb4b5\",\n            \"username\": \"zhengchong1\",\n            \"email\": \"z1c@qq.com\",\n            \"phone\": \"1342380547311\",\n            \"auth\":[0,2]\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>username</code> 用户名重复.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 ok\n{    \n   \"success\": false,\n      \"message\": \"E11000 duplicate key error collection: z_chong.users index: username_1 dup key: { : \\\"zhengchong1\\\" }\",\n      \"code\": 4001\n}",
          "type": "json"
        }
      ]
    },
    "filename": "servers/controllers/auth.js",
    "groupTitle": "auth"
  }
] });
