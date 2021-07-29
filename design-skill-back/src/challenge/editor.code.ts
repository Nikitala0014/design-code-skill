export default function makingAnagrams(arrAnagrams) {
    console.log('arrAnagrams: ', arrAnagrams);
    let result = 0
    arrAnagrams.map((item) => {
      const doubleItem = item * 2
      result += doubleItem
      return doubleItem
    })
    return result;
  }