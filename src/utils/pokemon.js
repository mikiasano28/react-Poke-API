// get all data not detail one
export const getAllPokemon = (url) => {
  // Promiseオブジェクトは4-6の処理が終わるまで待っててねという約束
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
  });
}

// get pokemon detail data
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  })
}


// try/catch
// async/await