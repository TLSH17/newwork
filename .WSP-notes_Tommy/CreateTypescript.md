##OOP
organize software design
```
class = 藍圖 (class name 需要大階)
class 儲住 property
property 儲住資料
Method (logic) = function

const 完之後就會行一次constructor

```

```
Access model:
global - 咩人都可以call
private - call in the same class
          If want to call private instance from other class, pls set up function(w/ return) in the class, then call the function in the current class.
protected - call in the same class or subclass
```


##Interface
Define object what is it look like

1. Define 每個interface 包咩
2. 每個class 要起番interface 元素＋constructor()


//@ts-ignore can ignore the para

super: call parent


1. npm init (打-y 會自動幫您答哂yes)
2. npm install ts-node @types/node typescript 

    #Express:
    npm install express
    npm install -D @types/express

    #Session:
    npm install express-session
    npm install -D @types/express-session

    #Formidable:
    npm install formidable @types/formidable

    #Jsonfile:
    npm i jsonfile

    #auto reload:
    npm i -D ts-node-dev

(裝番哂相應npm packages)

3. 開 tsconfig.json (copy 番CMS for Typescript setup, 好少機會改)
4. 開 .gitignore (mark低番邊樣野唔放上git)
    1. node_modules  (因為勁多野)
    2. .DS_Store (Mac機一定ignore埋依個)
    3. .env (重要！因為係密碼)

# OSX
.DS_Store*
Icon?

# npm
node_modules
*.log
*.gz
dist

# Env
.env

