import printNumbers, { goToBar, Person } from './app';
import filter from './filter';

// 1.  Mock the filter module (成個file mock 哂佢!)
jest.mock('./filter');

//faketimer setting;
jest.useFakeTimers();

afterEach(() => {
    (filter as jest.Mock).mockClear();
})

it('Testing printNumbers', () => {
    // 2. Test target
    // Since we are using typescript, tell compiler filter is a Mock.
    // Mock return value to be [1,3,5]
    (filter as jest.Mock).mockReturnValue("whatever");
    // Also need to mock console.log
    console.log = jest.fn();
    // IMPORTANT!! printNumbers is the testing function , it is never mock!!
    printNumbers();

    // Verification
    expect(filter).toHaveBeenCalledTimes(1);
    // !!其實唔care ans 係咩，只係要 check 比人call 時有無放番d 相應野入去
    // Fake timer
    jest.advanceTimersByTime(5000);

    expect(console.log).toBeCalledWith("whatever");
});

it("Testing goToBar", () => {
    const john = new Person(15);
    const peter = new Person(20);

    // 落一個spy 監聽住drink function
    const johnSpy = jest.spyOn(john, 'drink');
    const peterSpy = jest.spyOn(peter, 'drink');

    goToBar([john, peter]);
    expect(johnSpy).not.toBeCalled();
    expect(peterSpy).toBeCalled();
})