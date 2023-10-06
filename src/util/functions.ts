/* A List of global functions for use throughout the application */

export const generateUniqueKey = () => {
  return `swgu-component-${Date.now()}-${Math.random()}`;
}