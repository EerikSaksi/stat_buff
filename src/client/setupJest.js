jest.mock('@expo/vector-icons', () => {
  const mockComponent = require('react-native/jest/mockComponent')
  return {
    CachedIcon: mockComponent('Icon')
  }
})
