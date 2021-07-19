export const randomIdGenerator = () => {
  const letters = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).toUpperCase()
  const nums = Math.random().toString().slice(2, 11)

  return letters + nums
}
