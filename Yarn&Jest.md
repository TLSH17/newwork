# BAD001 Lecture

- TS Project Setup


- Install Jest

```bash
yarn add --dev jest
yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
yarn ts-jest config:init


```
- Touch .gitignore

```
.DS_Store
.env
*.session.sql
node_modules
```

- Touch tsconfig.json

```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "build", "scripts", "index.js"]
}
```

- Touch .prettierrc

```
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": false,
    "singleQuote": true,
    "overrides": [
        {
            "files": ["*.ts", "*.js"],
            "options": {
                "semi": true,
                "tabWidth": 2,
                "singleQuote": false,
                "printWidth": 100
            }
        }
    ]
}

```