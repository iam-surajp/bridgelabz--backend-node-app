import fs from 'fs';

export const writeToFile = async (data, filePath) => {
  try {
    const dataToWrite = JSON.stringify(data);
    console.log('data------------->>>',data);
    await fs.promises.writeFile(filePath, dataToWrite);
    console.log(`Data written to ${filePath}`);
  } catch (error) {
    throw error;
  }
};

export const readFromFile = async (filePath) => {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);
    console.log(parsedData);
    return parsedData;
  } catch (error) {
    throw error;
  }
};
