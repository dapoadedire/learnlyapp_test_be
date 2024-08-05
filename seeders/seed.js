const { Product } = require("../models");
const products = [
  {
    name: "Eco-Friendly Water Bottle",
    description: "Stay hydrated with this eco-friendly water bottle made from recycled materials.",
    price: 12.99,
    imageURL: "http://example.com/image1.png",
    createdBy: 2,
  },
  {
    name: "Smartphone Stand",
    description: "A sleek and adjustable stand for your smartphone, perfect for video calls and streaming.",
    price: 25.99,
    imageURL: "http://example.com/image2.png",
    createdBy: 2,
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Enjoy your music on the go with this compact and powerful Bluetooth speaker.",
    price: 45.99,
    imageURL: "http://example.com/image3.png",
    createdBy: 2,
  },
  {
    name: "Fitness Tracker Watch",
    description: "Keep track of your fitness goals with this stylish and functional tracker watch.",
    price: 89.99,
    imageURL: "http://example.com/image4.png",
    createdBy: 2,
  },
  {
    name: "Leather Laptop Sleeve",
    description: "Protect your laptop in style with this high-quality leather sleeve.",
    price: 60.99,
    imageURL: "http://example.com/image5.png",
    createdBy: 2,
  },
  {
    name: "Wireless Earbuds",
    description: "Experience true wireless freedom with these comfortable and high-performance earbuds.",
    price: 99.99,
    imageURL: "http://example.com/image6.png",
    createdBy: 2,
  },
  {
    name: "LED Desk Lamp",
    description: "Brighten up your workspace with this modern LED desk lamp with adjustable brightness.",
    price: 35.99,
    imageURL: "http://example.com/image7.png",
    createdBy: 2,
  },
  {
    name: "Stainless Steel Travel Mug",
    description: "Keep your beverages hot or cold for hours with this durable stainless steel travel mug.",
    price: 22.99,
    imageURL: "http://example.com/image8.png",
    createdBy: 2,
  },
  {
    name: "Multi-Function Tool Kit",
    description: "A versatile tool kit with multiple functions, ideal for home repairs and DIY projects.",
    price: 49.99,
    imageURL: "http://example.com/image9.png",
    createdBy: 2,
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly, this organic cotton t-shirt is a wardrobe essential.",
    price: 18.99,
    imageURL: "http://example.com/image10.png",
    createdBy: 2,
  },
];

(async () => {
  try {
    for (const product of products) {
      await Product.create(product);
    }
    console.log("Initial data seeded");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
})();