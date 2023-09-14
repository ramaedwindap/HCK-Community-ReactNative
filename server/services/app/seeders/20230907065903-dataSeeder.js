'use strict';

/** @type {import('sequelize-cli').Migration} */
const User = [
  {
    "username": "ramaedwindap",
    "email": "ramaedwindap@gmail.com",
    "password": "12345",
    "role": "admin",
    "phoneNumber": "087722275005",
    "address": "Cirebon"
  }
]
const dataUser = User.map((e) => {
  return {
    ...e,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

const dataCategory = [
  {
    "name": "Sports"
  },
  {
    "name": "Technology"
  },
  {
    "name": "Travel"
  },
  {
    "name": "Food & Drink"
  },
  {
    "name": "Entertainment"
  },
  {
    "name": "Health & Wellness"
  }
].map((e) => {
  return {
    ...e,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

const dataPost = [
  {
    "title": "Why every startup should be built on open-source... 🤔🤔",
    "slug": "why-every-startup-should-be-built-on-open-source",
    "content": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae provident, mollitia laudantium dolorum consectetur debitis iusto ipsum aperiam aliquam? Maiores odio minus veritatis voluptatem facere quasi necessitatibus ut voluptatibus sapiente!",
    "imgUrl": "https://res.cloudinary.com/practicaldev/image/fetch/s--EZFPG4_i--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/30uo500ajvfh3td06kp6.png",
    "categoryId": "1",
    "authorId": "1"
  },
  {
    "title": "Embracing the Power of AI in Everyday Life",
    "slug": "embracing-ai-in-everyday-life",
    "content": "Artificial Intelligence has woven itself into the fabric...",
    "imgUrl": "https://www.officelovin.com/wp-content/uploads/2014/05/twitter_hq_sf_13.jpg",
    "categoryId": "2",
    "authorId": "1"
  },
  {
    "title": "A Deep Dive into Quantum Computing",
    "slug": "deep-dive-into-quantum-computing",
    "content": "Quantum computers could revolutionize areas...",
    "imgUrl": "https://image.cnbcfm.com/api/v1/image/106198807-1571848425507handoutgooglepichaiquantum.jpg?v=1664024182",
    "categoryId": "3",
    "authorId": "1"
  },
  {
    "title": "The Future of Virtual Reality in Gaming",
    "slug": "future-of-vr-in-gaming",
    "content": "The world of virtual reality gaming is expanding...",
    "imgUrl": "https://www.technology-innovators.com/wp-content/uploads/2023/05/Virtual-Reality-Gaming-The-Evolution-of-Immersive-Entertainment-min.jpg",
    "categoryId": "4",
    "authorId": "1"
  },
  {
    "title": "Role of Big Data in Modern Business Decisions",
    "slug": "role-of-big-data-in-business",
    "content": "Businesses today rely heavily on data-driven decisions...",
    "imgUrl": "https://quantuzglobal.com/media/filer_public/45/c8/45c82697-6729-45c3-959e-501dc4ba3dd7/data-analytics.jpg",
    "categoryId": "5",
    "authorId": "1"
  },
  {
    "title": "The Impact of Blockchain Beyond Cryptocurrencies",
    "slug": "impact-of-blockchain-beyond-crypto",
    "content": "While most know blockchain for its role in cryptocurrencies...",
    "imgUrl": "https://umsu.ac.id/artikel/wp-content/uploads/2023/07/blockchain-750x375.webp",
    "categoryId": "6",
    "authorId": "1"
  }
].map((e) => {
  return {
    ...e,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

const dataTag = [
  {
    "name": "beginners",
    "postId": 5
  },
  {
    "name": "career",
    "postId": 1
  },
  {
    "name": "discuss",
    "postId": 3
  },
  {
    "name": "ai",
    "postId": 2
  },
  {
    "name": "learn",
    "postId": 6
  },
  {
    "name": "magic",
    "postId": 4
  },
  {
    "name": "techfeed",
    "postId": 3
  },
  {
    "name": "techfeed",
    "postId": 2
  },
  {
    "name": "techfeed",
    "postId": 1
  }
].map((e) => {
  return {
    ...e,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

// console.log(dataUser)
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', dataUser, {});
    await queryInterface.bulkInsert('Categories', dataCategory, {});
    await queryInterface.bulkInsert('Posts', dataPost, {});
    await queryInterface.bulkInsert('Tags', dataTag, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
