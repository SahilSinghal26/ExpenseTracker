// api.js
export const fetchWithAuth = async (url, options = {}) => {
    const token = sessionStorage.getItem('authToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      // Handle error responses
      throw new Error('Network response was not ok');
    }
    
    return response.json(); // or response.text(), etc. depending on your API
  };
  