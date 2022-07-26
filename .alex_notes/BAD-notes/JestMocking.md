##Jest Mocking Method

jest.fn(implementation?) : Mock Function that is automatically mocked by Jest. You can provide implementation if you wish but it is optional to do so.

-> Mock the function, keep check all the calls to this function.
```
 const mockPredicate = jest.fn(x => x % 2 == 0);
 mock to run function
 ```


jest.mock('module-name'): Mock a module . It auto-mocks all of the exported members of the module specified. You can override with other implementations.

```
We should mock any dependency (最根部的function)
1. jest.mock('./filter')  - mock 哂成個file
2. console.log = jest.fn() - mock 單一function/ 正常唔會test console.log
```

jest.spyOn(object,methodName): spyOn an existing modules . It tracks the call to object.methodName. You can substitute the implementation using the method mockImplementation.

-> Spy, check the module activity.
```
Put the spy on each variable
1. example: const johnSpy = jest.spyOn('john', 'drink');

```
