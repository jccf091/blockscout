import { reducer, initialState } from '../../js/pages/transaction'

test('RECEIVED_NEW_BLOCK', () => {
  const state = { ...initialState, blockNumber: 1 }
  const action = {
    type: 'RECEIVED_NEW_BLOCK',
    msg: {
      blockNumber: 5
    }
  }
  const output = reducer(state, action)

  expect(output.confirmations).toBe(4)
})

describe('RECEIVED_NEW_TRANSACTION_BATCH', () => {
  test('single transaction', () => {
    const state = initialState
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual(['test'])
    expect(output.batchCountAccumulator).toEqual(0)
    expect(output.transactionCount).toEqual(1)
  })
  test('large batch of transactions', () => {
    const state = initialState
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test 1'
      },{
        transactionHtml: 'test 2'
      },{
        transactionHtml: 'test 3'
      },{
        transactionHtml: 'test 4'
      },{
        transactionHtml: 'test 5'
      },{
        transactionHtml: 'test 6'
      },{
        transactionHtml: 'test 7'
      },{
        transactionHtml: 'test 8'
      },{
        transactionHtml: 'test 9'
      },{
        transactionHtml: 'test 10'
      },{
        transactionHtml: 'test 11'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual([])
    expect(output.batchCountAccumulator).toEqual(11)
    expect(output.transactionCount).toEqual(11)
  })
  test('single transaction after single transaction', () => {
    const state = Object.assign({}, initialState, {
      newTransactions: ['test 1']
    })
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test 2'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual(['test 1', 'test 2'])
    expect(output.batchCountAccumulator).toEqual(0)
  })
  test('single transaction after large batch of transactions', () => {
    const state = Object.assign({}, initialState, {
      newTransactions: [],
      batchCountAccumulator: 11
    })
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test 12'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual([])
    expect(output.batchCountAccumulator).toEqual(12)
  })
  test('large batch of transactions after large batch of transactions', () => {
    const state = Object.assign({}, initialState, {
      newTransactions: [],
      batchCountAccumulator: 11
    })
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test 12'
      },{
        transactionHtml: 'test 13'
      },{
        transactionHtml: 'test 14'
      },{
        transactionHtml: 'test 15'
      },{
        transactionHtml: 'test 16'
      },{
        transactionHtml: 'test 17'
      },{
        transactionHtml: 'test 18'
      },{
        transactionHtml: 'test 19'
      },{
        transactionHtml: 'test 20'
      },{
        transactionHtml: 'test 21'
      },{
        transactionHtml: 'test 22'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual([])
    expect(output.batchCountAccumulator).toEqual(22)
  })
  test('after disconnection', () => {
    const state = Object.assign({}, initialState, {
      channelDisconnected: true
    })
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual([])
    expect(output.batchCountAccumulator).toEqual(0)
  })
  test('on page 2+', () => {
    const state = Object.assign({}, initialState, {
      beyondPageOne: true
    })
    const action = {
      type: 'RECEIVED_NEW_TRANSACTION_BATCH',
      msgs: [{
        transactionHtml: 'test'
      }]
    }
    const output = reducer(state, action)

    expect(output.newTransactions).toEqual([])
    expect(output.batchCountAccumulator).toEqual(0)
  })
})
