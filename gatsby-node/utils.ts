// Replacing '/' would result in empty string which is invalid
export const replacePath = (path: string): string => {
  const result = path === `/` ? path : path.replace(/\/$/, ``)
  return result
}
