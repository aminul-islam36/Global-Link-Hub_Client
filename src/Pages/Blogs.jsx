import React from "react";
import BlogCard from "../Components/BlogCard";
import Title from "../utilities/Title";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      shortDescription:
        "Learn the basics of React and how to build your first component.",
      content:
        "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently.",
      author: {
        name: "Aminul Islam",
        avatar: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
      },
      category: "React",
      tags: ["react", "javascript", "frontend"],
      readTime: "5 min read",
      publishedDate: "2026-01-01",
    },
    {
      id: 2,
      title: "Understanding JSX in React",
      slug: "understanding-jsx-in-react",
      image: "https://i.ibb.co/react-blog-2.jpg",
      shortDescription:
        "JSX makes writing React components easier and more readable.",
      content:
        "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows developers to write UI code in a more declarative way.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "React",
      tags: ["jsx", "react", "frontend"],
      readTime: "4 min read",
      publishedDate: "2026-01-02",
    },
    {
      id: 3,
      title: "Props vs State Explained",
      slug: "props-vs-state-explained",
      image: "https://i.ibb.co/react-blog-3.jpg",
      shortDescription:
        "Understand the core difference between props and state in React.",
      content:
        "Props are used to pass data from parent to child components, while state is used to manage data within a component itself.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "React",
      tags: ["props", "state", "react"],
      readTime: "6 min read",
      publishedDate: "2026-01-03",
    },
    {
      id: 4,
      title: "Mastering useState Hook",
      slug: "mastering-usestate-hook",
      image: "https://i.ibb.co/react-blog-4.jpg",
      shortDescription:
        "Learn how to manage state effectively using useState hook.",
      content:
        "The useState hook allows functional components to have local state. It returns a state value and a function to update it.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "React",
      tags: ["hooks", "useState", "react"],
      readTime: "5 min read",
      publishedDate: "2026-01-04",
    },
    {
      id: 5,
      title: "Understanding useEffect Hook",
      slug: "understanding-useeffect-hook",
      image: "https://i.ibb.co/react-blog-5.jpg",
      shortDescription:
        "Handle side effects like API calls and DOM updates with useEffect.",
      content:
        "useEffect is used to perform side effects in React components such as fetching data or updating the document title.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "React",
      tags: ["useEffect", "hooks", "react"],
      readTime: "6 min read",
      publishedDate: "2026-01-05",
    },
    {
      id: 6,
      title: "What is a REST API?",
      slug: "what-is-rest-api",
      image: "https://i.ibb.co/api-blog-1.jpg",
      shortDescription:
        "Learn how frontend and backend communicate using REST APIs.",
      content:
        "A REST API allows applications to communicate using HTTP methods like GET, POST, PUT, and DELETE.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "Backend",
      tags: ["api", "rest", "backend"],
      readTime: "7 min read",
      publishedDate: "2026-01-06",
    },
    {
      id: 7,
      title: "Introduction to MongoDB",
      slug: "introduction-to-mongodb",
      image: "https://i.ibb.co/mongo-blog-1.jpg",
      shortDescription: "Get started with MongoDB and NoSQL databases.",
      content:
        "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, making it scalable and easy to use.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "Database",
      tags: ["mongodb", "database", "nosql"],
      readTime: "6 min read",
      publishedDate: "2026-01-07",
    },
    {
      id: 8,
      title: "Node.js for Beginners",
      slug: "nodejs-for-beginners",
      image: "https://i.ibb.co/node-blog-1.jpg",
      shortDescription: "Understand how Node.js runs JavaScript on the server.",
      content:
        "Node.js is a runtime environment that allows JavaScript to be executed outside the browser using the V8 engine.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "Backend",
      tags: ["nodejs", "javascript", "backend"],
      readTime: "8 min read",
      publishedDate: "2026-01-08",
    },
    {
      id: 9,
      title: "Express.js Explained Simply",
      slug: "expressjs-explained-simply",
      image: "https://i.ibb.co/express-blog-1.jpg",
      shortDescription: "Build APIs faster using Express.js framework.",
      content:
        "Express.js is a minimal and flexible Node.js framework used to build web applications and REST APIs.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "Backend",
      tags: ["express", "nodejs", "backend"],
      readTime: "7 min read",
      publishedDate: "2026-01-09",
    },
    {
      id: 10,
      title: "Complete MERN Stack Guide",
      slug: "complete-mern-stack-guide",
      image: "https://i.ibb.co/mern-blog-1.jpg",
      shortDescription:
        "A beginner-friendly guide to becoming a MERN stack developer.",
      content:
        "The MERN stack consists of MongoDB, Express, React, and Node.js. It is one of the most popular full-stack development stacks.",
      author: {
        name: "Aminul Islam",
        avatar: "https://i.ibb.co/avatar-1.png",
      },
      category: "Full Stack",
      tags: ["mern", "fullstack", "web development"],
      readTime: "10 min read",
      publishedDate: "2026-01-10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3"> </h1>
        <Title>📚Our Blogs</Title>
        <p className="text-gray-600">
          Read articles about React, MERN Stack, and Web Development
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
