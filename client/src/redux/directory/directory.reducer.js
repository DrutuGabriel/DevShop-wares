export const INITIAL_STATE = {
  sections: [
    {
      title: 'hats',
      imageUrl: `${process.env.PUBLIC_URL}/images/categories/hats.jpg`,
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'jackets',
      imageUrl: `${process.env.PUBLIC_URL}/images/categories/jackets.jpg`,
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'shoes',
      imageUrl: `${process.env.PUBLIC_URL}/images/categories/shoes.jpg`,
      id: 3,
      linkUrl: 'shop/shoes'
    },
    {
      title: 'womens',
      imageUrl: `${process.env.PUBLIC_URL}/images/categories/womens.jpg`,
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    },
    {
      title: 'mens',
      imageUrl: `${process.env.PUBLIC_URL}/images/categories/mens.jpg`,
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    default:
      return state;
  }
};

export default directoryReducer;