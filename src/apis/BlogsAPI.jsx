const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    for (const key in blogData) {
      formData.append(key, blogData[key]);
    }

    const response = await fetch(`${API_BASE_URL}/blogs/create`, {
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
    const response = await fetch(`${API_BASE_URL}/blogs`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// ✅ UPDATE blog (PUT with FormData)
export const updateBlog = async (blogId, blogData) => {
  try {
    const formData = new FormData();
    for (const key in blogData) {
      formData.append(key, blogData[key]);
    }

    const response = await fetch(`${API_BASE_URL}/blogs/update/${blogId}`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/delete/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error };
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        blog: data.blog || data, // Adjust based on your API response structure
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to fetch blog",
      };
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      success: false,
      message: "Network error while fetching blog",
    };
  }
};
