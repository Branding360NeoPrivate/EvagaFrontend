
export const pascalToNormal = (pascalString) => {
    let normalString = '';
  

    for (let i = 0; i < pascalString.length; i++) {
      const char = pascalString[i];
      if (char === char.toUpperCase() && i !== 0) {
        normalString += ' ';
      }

      normalString += char;
    }
  
    normalString = normalString
      .split(' ') 
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' '); 
  
    return normalString;
  };
