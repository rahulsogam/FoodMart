import base64
from enum import unique
from fastapi import FastAPI,File
import gridfs
from flask import Flask, Response, make_response,jsonify,request;
from flask_cors import CORS
from bson import Binary
from werkzeug.utils import secure_filename
import pymongo  
import os;
import json;
from bson import json_util
from datetime import datetime

app= Flask(__name__)
cors = CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
app.config["IMAGE_UPLOADS"] = "D:/Python Project/env/frontend/src/utilities/"

try:
    mongo=pymongo.MongoClient(
        host="localhost",
        port=27017,
        serverSelectionTimeoutMS=1000
    )
    db= mongo.FoodKart
    mongo.server_info() #trigger exception if can not connect to DB
except:
    print("Database Connection Failure..!!")

    
try:
    db.Categories.create_index({"category":1},{unique:True})
except:
    print('**')




#Insert Categories 
@app.route("/addCategory", methods=["POST"] )
def insertCategory():
    try:
        data= request.get_json()
        print(data)
        if db.Categories.count_documents(data)==1:
             return("Category already Exists in the database...",200)
        else:
            # db.Categories.insert_one(data)
            return("Category added successfully..",200)
    
    except Exception as ex:
        print(ex)

#Insert Product 
@app.route("/addProduct", methods=["POST"] )
def insertProduct():
    try:
        prod_img= request.files['img']
        file_name=secure_filename(prod_img.filename)
        prod_img.save(os.path.join(app.config["IMAGE_UPLOADS"], file_name))
        encoded_string = base64.b64encode(request.files['img'].read())
        db.Products.insert_one({'productCat':request.form['productCat'],
                                'productName':request.form['productName'],
                                'producDesc':request.form['producDesc'],
                                'producPrice':int(request.form['producPrice']),
                                'Image':encoded_string,
                                'Image_name':file_name
                                })
        return("Product added Successfully...",200)
    
    except Exception as ex:
        print(ex)

#Get Image
@app.route("/getProducts",methods=["GET"])
def getProducts():
    try:
        data=list(db.Products.find())
        for ProdData in data:
            ProdData["_id"]= str(ProdData["_id"])
            ProdData['Image']=ProdData['Image'].decode('utf-8')
        # image=base64.b64decode(ProdData['Image'])
        # print(base64.b64decode(ProdData['Image']),'_________----')
        return Response(
            response=json.dumps(data),
            status=200
        )
    except Exception as ex:
        print(ex)

@app.route("/getUsers",methods=["GET"])
def getUsers():
    try:
        data=list(db.Users.find())
        for ProdData in data:
            ProdData["_id"]= str(ProdData["_id"])
            
        return Response(
            response=json.dumps(data),
            status=200
        )
    except Exception as ex:
        print(ex)

@app.route("/getOrders",methods=["GET"])
def getOrders():
    try:
        datalist=[]
        data=list(db.Cart.find({'status':1}))
        print('here----',data)
        for ProdData in data:
            ProdData["_id"]= str(ProdData["_id"])
        return Response(
            response=json.dumps(data),
            status=200
        )
    except Exception as ex:
        print(ex)



@app.route("/GetCartDetails",methods=["POST"])
def GetCartCount():
    try:
        data= request.get_json()
        count=0
        email={'email':data['Email']}
        status={"status":0}
        if (db.Cart.count_documents(email)!=0):
            print("here----",db.Cart.count_documents(status))
            count=db.Cart.count_documents(status)
        return ({"msg":count})
    except Exception as ex:
        print(ex)

@app.route("/getCartProducts",methods=["POST"])
def getCartProducts():
    try:
        data= request.get_json()
        # print('######',data)
        cartData=list(db.Cart.find({'email':data['Email'],'status':0}))
        for data in cartData:
            data["_id"]= str(data["_id"])
        
        return Response(
            response=json.dumps(cartData),
            status=200,
            mimetype="application/json"
        )
        
    except Exception as ex:
        print(ex)

@app.route("/addToCart", methods=["POST"] )
def addToCart():
    try:
        
        data= request.get_json()
        email={'email':data['Email']}
        product={'product':data['product']}
        status={"status":0}
        print()
        if (db.Cart.count_documents(email)!=0):
            if(db.Cart.count_documents({"product":data['product'],"status":0}))>0:
                    return("Product already added to Cart",200)
            else:
                db.Cart.insert_one({"email":data['Email'],"product":data['product'],"status":0,'date':datetime.today().strftime('%d-%m-%y'),"productPrice":data['productPrice']})
                return("Product added successfully.",200)
        else:
            db.Cart.insert_one({"email":data['Email'],"product":data['product'],"status":0,'date':datetime.today().strftime('%d-%m-%y'),"productPrice":data['productPrice']})
            return("Product added successfully.",200)
            
    except Exception as ex:
        print(ex)

@app.route("/addUser", methods=["POST"] )
def insertUser():
    try:
        data= request.get_json()
        email={'Email':data['Email']}
        
        print(email,"heres",db.Users.count_documents(email) )
        if db.Users.count_documents(email)==1:
            return("Email id already taken",200)
        else:
            db.Users.insert_one(data)
            return("User added successfully.",200)
    except Exception as ex:
        print(ex)


@app.route("/verifyUser", methods=["POST"] )
def verifyUser():
    try:
        data= request.get_json()
        Email={'Email':data['Email']}
        user=db.Users.find_one(Email)
        pwd={'Password':data['pwd']}
        
        print(json_util.dumps(user))
        if (db.Users.count_documents(Email)==1):
            if(user['Password']==pwd['Password']):
                return ({'msg':'Success','userInfo':json.loads(json_util.dumps(user))})
            return({'msg':'Invalid Password'})
        else:
            return({'msg':'Invalid Email','status':200})
    except Exception as ex:
        print(ex)
        return({'msg':'false','status':200})


@app.route("/uploadForm",methods=["POST"])
def uploadfile():
    try:
        data=request.form[data]
        img=request.files.get('img')
        print(data,img)
        return "OK", 200
    except:
        print('Error')

@app.route("/getCategories",methods=["GET"])
def getCategories():
    try:
        data=list(db.Categories.find())
        for category in data:
            category["_id"]= str(category["_id"])
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

@app.route("/delCategory",methods=["DELETE"])
def deleteCategory():
    try:
        data= request.get_json()
        db.Categories.delete_one(data)
        return("Category deleted successfully..")
    except Exception as ex:
        print(ex)

@app.route("/deleteProduct",methods=["Post"])
def deleteProduct():
    try:
        data= request.get_json()
        print(data)
        db.Cart.delete_one({"product":data['product'],"status":0})
        
        return('Item Removed from cart')
    except Exception as ex:
        print(ex)


@app.route("/placeOrder",methods=["Post"])
def placeOrder():
    try:
        data= request.get_json()
        myquery = { "email":data['Email'],'status':0}
        newvalues = { "$set": { "status":1} }
        db.Cart.update_many(myquery,newvalues)
        return('Order Placed')
    except Exception as ex:
        print(ex)


if(__name__)=="__main__":
    app.run(port=8080,debug=True)