import requests
import json


# Globals
API = "http://34.75.232.226:3000"
TOKEN = ""


# ==================================Users=========================================
def signupUser(email, password):
    url = API+"/users/signup/"
    body = {
        "email": email,
        "password": password
    }
    res = requests.post(url, data=body)
    return json.loads(res.text)


def loginUser(email, password):
    global TOKEN
    url = API+"/users/login/"
    body = {
        "email": email,
        "password": password
    }
    res = requests.post(url, data=body)
    res = json.loads(res.text)
    if 'token' in res:
        TOKEN = res['token']
    return res


def deleteUser(id):
    global TOKEN
    url = API+"/users/"+id
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.delete(url, headers=headers)
    return json.loads(res.text)


# ==================================Products=========================================

def addProduct(name, price):
    print("==================")
    global TOKEN
    url = API+"/products/"
    headers = {"Authorization": "Bearer " + TOKEN}
    body = {
        "name": name,
        "price": price,
        "productImage": "temp"
    }
    print(body, url)
    res = requests.post(url, data=body, headers=headers)
    return json.loads(res.text)


def getAllProducts():
    url = API+"/products/"
    res = requests.get(url)
    return json.loads(res.text)


def getProductById(id):
    url = API+"/products/"+id
    res = requests.get(url)
    return json.loads(res.text)


def deleteProduct(id):
    url = API+"/products/"+id
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.delete(url, headers=headers)
    return json.loads(res.text)


def updateProduct(id, updates):
    url = API+"/products/"+id
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.patch(url, data=updates, headers=headers)
    return json.loads(res.text)


# ==================================Orders=========================================

def addOrder(productId, quantity):
    global TOKEN
    url = API+"/orders/"
    headers = {"Authorization": "Bearer " + TOKEN}
    body = {
        "productId": productId,
        "quantity": quantity
    }
    res = requests.post(url, data=body, headers=headers)
    return json.loads(res.text)


def getAllOrders():
    url = API+"/orders/"
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.get(url, headers=headers)
    return json.loads(res.text)


def getOrderById(id):
    url = API+"/orders/"+id
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.get(url, headers=headers)
    return json.loads(res.text)


def deleteOrder(id):
    url = API+"/orders/"+id
    headers = {"Authorization": "Bearer " + TOKEN}
    res = requests.delete(url, headers=headers)
    return json.loads(res.text)


# =============================================================================

while True:
    print("=================================================")
    print("Select Route ....")
    print("1. users")
    print("2. products")
    print("3. orders")
    print("4. exit")
    outerinp = int(input("Enter input : "))
    if outerinp == 4:
        break
    elif outerinp == 1:
        while True:
            print(".............................................")
            print("Select Options ....")
            print("1. signup")
            print("2. login")
            print("3. delete")
            print("4. back")
            innerinp = int(input("Enter input : "))
            if innerinp == 4:
                break
            elif innerinp == 1:
                email = input("Enter email : ")
                password = input("Enter password : ")
                print(signupUser(email, password))
            elif innerinp == 2:
                email = input("Enter email : ")
                password = input("Enter password : ")
                print(loginUser(email, password))
            elif innerinp == 3:
                id = input("Enter Id :")
                print(deleteUser(id))
            else:
                continue
    elif outerinp == 2:
        while True:
            print(".............................................")
            print("Select Options ....")
            print("1. add")
            print("2. get all products")
            print("3. get product by id")
            print("4. update product")
            print("5. delete product")
            print("6. back")
            innerinp = int(input("Enter input : "))
            if innerinp == 6:
                break
            elif innerinp == 1:
                # name = input("Enter product name :")
                # price = input("Enter price : ")
                # print(addProduct(name, price))
                print("Refer postman for this task")
            elif innerinp == 2:
                print(getAllProducts())
            elif innerinp == 3:
                id = input("Enter Id :")
                print(getProductById(id))
            elif innerinp == 4:
                # id = id = input("Enter Id :")
                # name = input("Enter new name:")
                # price = input("Enter new price:")
                # one = {"propName": "name", "value": name},
                # two = {"propName": "price", "value": price}
                # updates = one
                # print(updateProduct(id, updates))
                print("Refer postman for this task")
            elif innerinp == 5:
                id = input("Enter Id :")
                print(deleteProduct(id))
            else:
                continue
    elif outerinp == 3:
        while True:
            print(".............................................")
            print("Select Options ....")
            print("1. add")
            print("2. get all orders")
            print("3. get order by id")
            print("4. delete product")
            print("6. back")
            innerinp = int(input("Enter input : "))
            if innerinp == 6:
                break
            elif innerinp == 1:
                productId = input("Enter product id :")
                quantity = input("Enter quantity :")
                print(addOrder(productId, quantity))
            elif innerinp == 2:
                print(getAllOrders())
            elif innerinp == 3:
                id = input("Enter Id :")
                print(getOrderById(id))
            elif innerinp == 4:
                id = input("Enter Id :")
                print(deleteOrder(id))
            else:
                continue
    else:
        continue




