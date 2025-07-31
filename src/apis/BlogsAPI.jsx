export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    for (const key in blogData) {
      formData.append(key, blogData[key]);
    }

    const response = await fetch("http://localhost:8080/api/v1/blogs/create", {
      method: "POST",

      body: formData, // no JSON.stringify
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// ✅ Add this for GET request
export const getAllBlogs = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/blogs");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
