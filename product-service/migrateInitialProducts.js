const db = require('./product-service/db/dynamoDBClient');

var productsTableParams = {
  RequestItems: {
    "CloudX_Products": [
      {
        PutRequest: {
          Item: {
          "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
          "description": "Short Product Description1",
          "price": 24,
          "title": "ProductOne"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "description": "Short Product Description7",
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
            "price": 15,
            "title": "ProductTitle"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "description": "Short Product Description2",
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            "price": 23,
            "title": "Product"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "description": "Short Product Description4",
            "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
            "price": 15,
            "title": "ProductTest"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "description": "Short Product Descriptio1",
            "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
            "price": 23,
            "title": "Product2"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "description": "Short Product Description7",
            "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
            "price": 15,
            "title": "ProductName"
          }
        }
      },
    ]
  }
};

db.batchWrite(productsTableParams).promise();

var stocksTableParams = {
  RequestItems: {
    "CloudX_Stocks": [
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
            "count": 2,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
            "count": 7,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            "count": 10,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
            "count": 22,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
            "count": 11,
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
            "count": 999,
          }
        }
      },
    ]
  }
};

db.batchWrite(stocksTableParams).promise();