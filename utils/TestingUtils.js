export const dispatch = mockState => fn => {
  mockState.value = fn(mockState.value)
}
