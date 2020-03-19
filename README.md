# Sickly Application 
<img src="https://user-images.githubusercontent.com/29695350/77021437-aa169f00-6954-11ea-9fc4-bc4cf1136b39.png" width="200" height="200" align="right">






1. Ensure API URL is correct in `src/components/Home/service.js`
```js
  var restClient = feathers.rest('http://localhost:8080')
```

2. Add your schema and field names in `src/components/Home/index.js`
```js
schema: 'Test',

...

{ key: 'text', type: 'text', field: 'text', },
{ key: 'number', type: 'text', field: 'number', },
```

3. Start 
```
npm start
```

4. Visit http://localhost:8081/ 
