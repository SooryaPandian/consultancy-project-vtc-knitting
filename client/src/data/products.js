
export const Product = {
  id: 0,
  name: "",
  category: "",
  type: "",
  description: "",
  basePrice: 0,
  image: "",
  rating: 0,
  discount: 0,
  offerEndsAt: null,
  variants: [],
  reviews: [],
};

const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    category: "Men",
    type: "T-Shirts",
    basePrice: 399,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    description:
      "# Premium Cotton T-Shirt\n\nOur Classic Cotton T-Shirt is crafted from the finest cotton available in Tiruppur. \n\n## Features\n\n- Ultra soft 100% combed cotton\n- Reinforced stitching for durability\n- Pre-shrunk fabric\n- Available in multiple colors",
    discount: 10,
    offerEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [
      {
        colorName: "White",
        colorCode: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        sizes: [
          { size: "S", price: 399, stock: 25 },
          { size: "M", price: 399, stock: 30 },
          { size: "L", price: 429, stock: 20 },
          { size: "XL", price: 449, stock: 15 },
          { size: "XXL", price: 469, stock: 10 },
        ],
      },
      {
        colorName: "Black",
        colorCode: "#000000",
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        sizes: [
          { size: "S", price: 399, stock: 30 },
          { size: "M", price: 399, stock: 30 },
          { size: "L", price: 429, stock: 20 },
        ],
      },
      {
        colorName: "Navy",
        colorCode: "#000080",
        images: [
          "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        ],
        sizes: [
          { size: "S", price: 399, stock: 20 },
          { size: "M", price: 399, stock: 30 },
          { size: "L", price: 429, stock: 20 },
        ],
      },
    ],
    reviews: [
      {
        id: "rev1",
        username: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent quality and very comfortable to wear all day.",
        date: "2025-02-15",
      },
      {
        id: "rev2",
        username: "Anil Sharma",
        rating: 4,
        comment: "Good product but sizing runs a bit small.",
        date: "2025-01-28",
      },
    ],
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    category: "Men",
    type: "Jeans",
    basePrice: 999,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    description: "Premium quality slim fit denim jeans for men with comfortable stretch fabric.",
    discount: 15,
    offerEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Dark Blue",
      colorCode: "#151B54",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "30", price: 999, stock: 25 },
        { size: "32", price: 999, stock: 30 },
        { size: "34", price: 1049, stock: 20 },
        { size: "36", price: 1099, stock: 15 },
        { size: "38", price: 1149, stock: 10 },
      ],
    },
    {
      colorName: "Black",
      colorCode: "#000000",
      images: [
        "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "30", price: 999, stock: 30 },
        { size: "32", price: 999, stock: 30 },
        { size: "34", price: 1049, stock: 20 },
      ],
    },
    {
      colorName: "Light Blue",
      colorCode: "#6698FF",
      images: [
        "https://images.unsplash.com/photo-1511105043137-7e66f28270e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "30", price: 999, stock: 20 },
        { size: "32", price: 999, stock: 30 },
        { size: "34", price: 1049, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 3,
    name: "Casual Button-Down Shirt",
    category: "Men",
    type: "Shirts",
    basePrice: 799,
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    description: "Premium casual button-down shirt for men, perfect for daily wear.",
    discount: 12,
    offerEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "White",
      colorCode: "#FFFFFF",
      images: [
        "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "S", price: 799, stock: 25 },
        { size: "M", price: 799, stock: 30 },
        { size: "L", price: 849, stock: 20 },
        { size: "XL", price: 899, stock: 15 },
        { size: "XXL", price: 949, stock: 10 },
      ],
    },
    {
      colorName: "Blue",
      colorCode: "#0000FF",
      images: [
        "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "S", price: 799, stock: 30 },
        { size: "M", price: 799, stock: 30 },
        { size: "L", price: 849, stock: 20 },
      ],
    },
    {
      colorName: "Gray",
      colorCode: "#808080",
      images: [
        "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "S", price: 799, stock: 20 },
        { size: "M", price: 799, stock: 30 },
        { size: "L", price: 849, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 4,
    name: "Designer Sundress",
    category: "Women",
    type: "Dresses",
    basePrice: 1299,
    image:
      "https://images.unsplash.com/photo-1615886753866-79396abc446e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    description: "Elegant designer sundress for women, perfect for summer outings.",
    discount: 8,
    offerEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Floral",
      colorCode: "#FFFFFF",
      images: [
        "https://images.unsplash.com/photo-1615886753866-79396abc446e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 1299, stock: 15 },
        { size: "S", price: 1299, stock: 25 },
        { size: "M", price: 1299, stock: 30 },
        { size: "L", price: 1349, stock: 20 },
        { size: "XL", price: 1399, stock: 10 },
      ],
    },
    {
      colorName: "Blue",
      colorCode: "#1560BD",
      images: [
        "https://images.unsplash.com/photo-1623609163859-ca93c959f449?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 1299, stock: 15 },
        { size: "S", price: 1299, stock: 30 },
        { size: "M", price: 1299, stock: 30 },
        { size: "L", price: 1349, stock: 20 },
      ],
    },
    {
      colorName: "Pink",
      colorCode: "#FF69B4",
      images: [
        "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 1299, stock: 15 },
        { size: "S", price: 1299, stock: 20 },
        { size: "M", price: 1299, stock: 30 },
        { size: "L", price: 1349, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 5,
    name: "Slim Fit Trousers",
    category: "Women",
    type: "Trousers",
    basePrice: 899,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    description: "Comfortable slim fit trousers for women, perfect for office wear.",
    discount: 7,
    offerEndsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Black",
      colorCode: "#000000",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 899, stock: 15 },
        { size: "S", price: 899, stock: 25 },
        { size: "M", price: 899, stock: 30 },
        { size: "L", price: 949, stock: 20 },
        { size: "XL", price: 999, stock: 10 },
      ],
    },
    {
      colorName: "Navy",
      colorCode: "#000080",
      images: [
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 899, stock: 15 },
        { size: "S", price: 899, stock: 30 },
        { size: "M", price: 899, stock: 30 },
        { size: "L", price: 949, stock: 20 },
      ],
    },
    {
      colorName: "Beige",
      colorCode: "#F5F5DC",
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 899, stock: 15 },
        { size: "S", price: 899, stock: 20 },
        { size: "M", price: 899, stock: 30 },
        { size: "L", price: 949, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 6,
    name: "Blouse Top",
    category: "Women",
    type: "Tops",
    basePrice: 699,
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    description: "Stylish blouse top for women, perfect for casual and semi-formal occasions.",
    discount: 9,
    offerEndsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "White",
      colorCode: "#FFFFFF",
      images: [
        "https://images.unsplash.com/photo-1551163943-3f6a855d1153?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 699, stock: 15 },
        { size: "S", price: 699, stock: 25 },
        { size: "M", price: 699, stock: 30 },
        { size: "L", price: 749, stock: 20 },
        { size: "XL", price: 799, stock: 10 },
      ],
    },
    {
      colorName: "Red",
      colorCode: "#FF0000",
      images: [
        "https://images.unsplash.com/photo-1565549102802-763c4da83455?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 699, stock: 15 },
        { size: "S", price: 699, stock: 30 },
        { size: "M", price: 699, stock: 30 },
        { size: "L", price: 749, stock: 20 },
      ],
    },
    {
      colorName: "Blue",
      colorCode: "#0000FF",
      images: [
        "https://images.unsplash.com/photo-1559334417-a57bd929f003?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "XS", price: 699, stock: 15 },
        { size: "S", price: 699, stock: 20 },
        { size: "M", price: 699, stock: 30 },
        { size: "L", price: 749, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 7,
    name: "Kids Graphic T-Shirt",
    category: "Children",
    type: "T-Shirts",
    basePrice: 299,
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    description: "Fun graphic t-shirts for kids with colorful designs.",
    discount: 5,
    offerEndsAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Blue",
      colorCode: "#1560BD",
      images: [
        "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 299, stock: 25 },
        { size: "5-6Y", price: 299, stock: 30 },
        { size: "7-8Y", price: 329, stock: 25 },
        { size: "9-10Y", price: 349, stock: 20 },
      ],
    },
    {
      colorName: "Red",
      colorCode: "#FF0000",
      images: [
        "https://images.unsplash.com/photo-1590480598135-3be153d24b80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 299, stock: 25 },
        { size: "5-6Y", price: 299, stock: 30 },
        { size: "7-8Y", price: 329, stock: 25 },
        { size: "9-10Y", price: 349, stock: 20 },
      ],
    },
    {
      colorName: "Yellow",
      colorCode: "#FFFF00",
      images: [
        "https://images.unsplash.com/photo-1604113559696-81516a0093f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 299, stock: 25 },
        { size: "5-6Y", price: 299, stock: 30 },
        { size: "7-8Y", price: 329, stock: 25 },
        { size: "9-10Y", price: 349, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 8,
    name: "Kids Denim Jeans",
    category: "Children",
    type: "Jeans",
    basePrice: 599,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    description: "Durable denim jeans for kids with adjustable waistband.",
    discount: 10,
    offerEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Blue",
      colorCode: "#1560BD",
      images: [
        "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 599, stock: 25 },
        { size: "5-6Y", price: 599, stock: 30 },
        { size: "7-8Y", price: 649, stock: 25 },
        { size: "9-10Y", price: 699, stock: 20 },
      ],
    },
    {
      colorName: "Black",
      colorCode: "#000000",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 599, stock: 25 },
        { size: "5-6Y", price: 599, stock: 30 },
        { size: "7-8Y", price: 649, stock: 25 },
        { size: "9-10Y", price: 699, stock: 20 },
      ],
    }],
    reviews: [],
  },
  {
    id: 9,
    name: "Kids Casual Shorts",
    category: "Children",
    type: "Shorts",
    basePrice: 399,
    image:
      "https://images.unsplash.com/photo-1565084886872-25ed77625acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    description: "Comfortable casual shorts for kids, perfect for playtime.",
    discount: 5,
    offerEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    variants: [{
      colorName: "Blue",
      colorCode: "#1560BD",
      images: [
        "https://images.unsplash.com/photo-1565084886872-25ed77625acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 399, stock: 25 },
        { size: "5-6Y", price: 399, stock: 30 },
        { size: "7-8Y", price: 429, stock: 25 },
        { size: "9-10Y", price: 449, stock: 20 },
      ],
    },
    {
      colorName: "Red",
      colorCode: "#FF0000",
      images: [
        "https://images.unsplash.com/photo-1627843240167-b1f9311315bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 399, stock: 25 },
        { size: "5-6Y", price: 399, stock: 30 },
        { size: "7-8Y", price: 429, stock: 25 },
        { size: "9-10Y", price: 449, stock: 20 },
      ],
    },
    {
      colorName: "Gray",
      colorCode: "#808080",
      images: [
        "https://images.unsplash.com/photo-1585337863847-b3cdbe3548b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      ],
      sizes: [
        { size: "3-4Y", price: 399, stock: 25 },
        { size: "5-6Y", price: 399, stock: 30 },
        { size: "7-8Y", price: 429, stock: 25 },
        { size: "9-10Y", price: 449, stock: 20 },
      ],
    }],
    reviews: [],
  },
];

export default products;
