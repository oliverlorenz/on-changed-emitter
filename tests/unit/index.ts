import test from 'tape';
import { OnChangedEmitter } from '../../src/index';

const TestObject = class TestObject extends OnChangedEmitter { }

test('onChanged calls callback once, if set called once', function(t) {
    t.plan(1);

    const testObject = new TestObject();
    testObject.onChanged(() => {
        t.pass('callback was called once')
    })
    
    testObject.set('test value')
})

test('onChanged contains in updateData a valid previous value', function(t) {
    t.plan(2);

    const testValue = 'test value';

    const testObject = new TestObject();
    testObject.onChanged((updateData) => {
        t.equals(updateData.previousValue, null);
        t.equals(updateData.currentValue, testValue); 
    })
    
    testObject.set(testValue)
})

test('onChanged calls callback only once, if set called twice with same data', function(t) {
    t.plan(1);

    const testObject = new TestObject();
    testObject.onChanged(() => {
        t.pass('callback was called')
    })
    
    testObject.set('test value 1')
    testObject.set('test value 1')
})

test('Object emits change with changed previousValue in updateData', function(t) {
    t.plan(4);

    const firstUpdateValue = 'first value';
    const secondUpdateValue = 'second value';

    const testObject = new TestObject();
    testObject.onceChanged((firstUpdateData) => {
        t.equals(firstUpdateData.previousValue, null);
        t.equals(firstUpdateData.currentValue, firstUpdateValue);
        testObject.onceChanged((secondUpdateData) => {
            t.equals(secondUpdateData.previousValue, firstUpdateValue);
            t.equals(secondUpdateData.currentValue, secondUpdateValue);
        });
        testObject.set(secondUpdateValue);
    })
    testObject.set(firstUpdateValue);
})

test('onceChanged emits only once if set was called twice, also if data differs', function(t) {
    t.plan(1);

    const firstUpdateValue = 'first value';
    const secondUpdateValue = 'second value';
    
    const testObject = new TestObject();
    testObject.onceChanged(() => {
        t.pass('callback was called')
        testObject.set(secondUpdateValue);
    });

    testObject.set(firstUpdateValue);
})
