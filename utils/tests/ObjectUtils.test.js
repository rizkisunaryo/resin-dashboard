import ObjectUtils from '../../utils/ObjectUtils'

describe('ObjectUtils', () => {
  describe('difference', () => {
    test('it should show the difference between two objects', () => {
      const a = {b: 'c', d: 'e', f: {g: 'h', i: 'j'}}
      const b = {b: 'c', d: 'k', f: {g: 'l', i: 'j'}}
      expect(ObjectUtils.difference(b, a)).toEqual({
        d: 'k',
        f: {g: 'l'}
      })
    })
  })
})
