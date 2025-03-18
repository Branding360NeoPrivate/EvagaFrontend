
export const pascalToNormal = (pascalString) => {
    let normalString = '';
  
    // Iterate through each character
    for (let i = 0; i < pascalString.length; i++) {
      const char = pascalString[i];
      // Add a space before uppercase letters (except the first character)
      if (char === char.toUpperCase() && i !== 0) {
        normalString += ' ';
      }
      // Add the character to the result
      normalString += char;
    }
  
    // Split the string into words, capitalize the first letter of each word, and join them back
    normalString = normalString
      .split(' ') // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join back into a sentence
  
    return normalString;
  };
