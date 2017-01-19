import fetch from 'node-fetch';

export const getTopBoards = () => (
 fetch(`https://www.mavenx.com/embed/board/BFkfZrN4xFmqqhztm`)
   .then((res) => res.url)
);

export const getProductsByCategory = (category = 'All') => (
 fetch(`https://www.mavenx.com/products?category=${category}`)
   .then((res) => res)
);
