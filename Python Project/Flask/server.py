from flask import Flask,Response
import pymongo
import json
from bson.objectid import ObjectId
app = Flask(__name__)

try:
    mongo=pymongo.MongoClient(
        host="localhost",
        port=27017,
        serverSelectionTimeoutMS=1000
    )
    db= mongo.ecommerce
    mongo.server_info() #trigger exception if can not connect to DB
except:
    print("Database Connection Failure..!!")
########################
@app.route("/users", methods=["POST"])
def create_user():
    try:
        user={"name":"rahul","Lastname":"Sogam"}
        dbResponse=db.users.insert_one(user)
        #for attr in dir(dbResponse):
        #    print(attr)
        return Response(
            response=json.dumps(
                    {
                        "message":"userId created",
                        "id":f"{dbResponse.inserted_id}",
                    }
                ),
                status=200,
                mimetype="application/json"
        )
    except Exception as ex:
        print(ex)

@app.route("/getUsers",methods=["GET"])
def getUsers():
    try:
        data=list(db.users.find())
        for user in data:
            user["_id"]= str(user["_id"])
        print(data)
        return Response(
            response=json.dumps(data),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps(
                    {
                        "message":"No users found..!!"
                    }
                ),
            status=500,
            mimetype="application/json"
        )

########################
if(__name__)=="__main__":
    app.run(port=80,debug=True)